// firestore-utils.js
import { db, auth } from "./firebase-init.js";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

/**
 * Собирает значения всех ползунков (сфер) из текущего DOM.
 * Возвращает объект вида:
 * {
 *   health: { appearance: 5, nutrition: 7, ... },
 *   relationships: { communication: 6, friends: 8, ... },
 *   ... и т.д.
 * }
 */
export function collectCurrentSliders(spheres) {
  const results = {};
  spheres.forEach((sphere) => {
    const sphereData = {};
    sphere.questions.forEach((q) => {
      const slider = document.getElementById(`slider_${sphere.id}_${q.id}`);
      sphereData[q.id] = parseInt(slider.value, 10);
    });
    results[sphere.id] = sphereData;
  });
  return results;
}

/**
 * Применяет загруженные данные к ползункам, перерисовывает колесо.
 * data — объект такого же формата, как возвращает collectCurrentSliders().
 */
export function applySlidersFromData(data) {
  // Для каждой сферы
  Object.keys(data).forEach((sphereId) => {
    // Для каждого вопроса
    const sphereObj = data[sphereId];
    Object.keys(sphereObj).forEach((questionId) => {
      const slider = document.getElementById(`slider_${sphereId}_${questionId}`);
      if (slider) {
        slider.value = sphereObj[questionId];
        // Вызываем updateSliderDisplay, чтобы описание и цвет тоже обновились
        // (зависит от того, как у вас называется функция)
        window.updateSliderDisplay(sphereId, questionId, slider.value);
      }
    });
    // После того как все вопросы сферы расставили — пересчитываем среднее
    window.updateSphereAverage(sphereId);
  });
  // И перерисовываем колесо
  window.drawWheel();
}

/**
 * Сохранить текущее состояние ползунков в Firestore (подколлекция savedEntries).
 * title — название, которое пользователь ввёл, например "Мой результат".
 * spheres — массив сфер (у вас в main.js есть const spheres = [...]).
 */
export async function saveResultToFirestore(title, spheres) {
  const user = auth.currentUser;
  if (!user) {
    return false;
  }
  // Собираем данные с ползунков
  const resultData = collectCurrentSliders(spheres);

  // Подготовим объект, который пойдёт в Firestore
  const entry = {
    title: title,
    createdAt: serverTimestamp(),
    data: resultData,
  };

  // Ссылка на документ "results/user.uid"
  const userDocRef = doc(db, "results", user.uid);
  // Подколлекция "savedEntries"
  const subcolRef = collection(userDocRef, "savedEntries");

  try {
    // addDoc — добавляет новый документ с автогенерированным ID
    await addDoc(subcolRef, entry);
    return true;
  } catch (error) {
    console.error("Ошибка при сохранении:", error);
    return false;
  }
}

/**
 * Загрузить список результатов (documents) из подколлекции savedEntries
 * Возвращает массив объектов вида:
 * [ { id: "...", title: "...", createdAt: Timestamp, data: {...} }, ... ]
 */
export async function loadResultsList() {
  const user = auth.currentUser;
  if (!user) {
    return [];
  }

  const userDocRef = doc(db, "results", user.uid);
  const subcolRef = collection(userDocRef, "savedEntries");

  try {
    const querySnapshot = await getDocs(subcolRef);
    const entries = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      entries.push({
        id: doc.id,
        title: data.title,
        createdAt: data.createdAt,
        data: data.data
      });
    });

    // Сортируем по дате в порядке убывания (сначала новые)
    entries.sort((a, b) => {
      if (a.createdAt.seconds && b.createdAt.seconds) {
        return b.createdAt.seconds - a.createdAt.seconds;
      }
      return 0;
    });

    return entries;
  } catch (error) {
    console.error("Ошибка при загрузке результатов:", error);
    return [];
  }
}

/**
 * Загрузить конкретный сохранённый результат (entryId) и применить к ползункам.
 */
export async function loadSavedResult(entryId) {
  const user = auth.currentUser;
  if (!user) {
    return null;
  }

  const userDocRef = doc(db, "results", user.uid);
  const subcolRef = collection(userDocRef, "savedEntries");
  const entryRef = doc(subcolRef, entryId);

  try {
    const docSnap = await getDoc(entryRef);
    if (docSnap.exists()) {
      return docSnap.data().data;
    }
    return null;
  } catch (error) {
    console.error("Ошибка при загрузке:", error);
    return null;
  }
}

/**
 * Удалить сохранённый результат (entryId) из Firestore
 */
export async function deleteSavedResult(entryId) {
  const user = auth.currentUser;
  if (!user) {
    console.error("Пользователь не авторизован!");
    return;
  }

  const userDocRef = doc(db, "results", user.uid);
  const subcolRef = collection(userDocRef, "savedEntries");
  const entryRef = doc(subcolRef, entryId);

  try {
    await deleteDoc(entryRef);
    console.log("Результат удалён:", entryId);
    // alert("Результат удалён!");
  } catch (error) {
    console.error("Ошибка при удалении:", error);
  }
}
