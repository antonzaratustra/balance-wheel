// main.js
import { auth } from "./firebase-init.js";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Функция для проверки аутентификации
function checkAuthState() {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

// Функция для входа через Google
// Функция для определения мобильного устройства
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Обработчик результата редиректа
async function handleRedirectResult() {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      const user = result.user;
      console.log("Пользователь вошёл после редиректа:", user);
      localStorage.setItem("uid", user.uid);
      return user;
    }
  } catch (error) {
    console.error("Ошибка при обработке редиректа:", error);
    if (error.code !== "auth/cancelled-popup-request") {
      alert("Ошибка входа: " + error.message);
    }
    throw error;
  }
  return null;
}

// Результат редиректа проверяется в DOMContentLoaded

// Экспортируем функцию для использования в main.js
export async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    
    let user;
    
    if (isMobileDevice()) {
      // Для мобильных устройств используем signInWithRedirect
      console.log("Используем signInWithRedirect для мобильного устройства");
      await signInWithRedirect(auth, provider);
      return null; // Пользователь будет доступен только после редиректа
    } else {
      // Для десктопов используем signInWithPopup
      const result = await signInWithPopup(auth, provider);
      user = result.user;
      console.log("Пользователь вошёл:", user);
      
      localStorage.setItem("uid", user.uid);
      
      // Закрываем модальное окно после успешной авторизации
      const loginModalEl = document.getElementById("loginModal");
      if (loginModalEl) {
        const loginModal = bootstrap.Modal.getInstance(loginModalEl);
        if (loginModal) {
          loginModal.hide();
          // Удаляем backdrop и очищаем стили
          document.body.classList.remove('modal-open');
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) backdrop.remove();
        }
      }
      
      return user;
    }
  } catch (error) {
    console.error("Ошибка авторизации:", error);
    // Показываем ошибку только если она не связана с отменой запроса
    if (error.code !== "auth/cancelled-popup-request") {
      alert("Ошибка входа: " + error.message);
    }
    throw error;
  }
}

// Функция для инициализации аутентификации
document.addEventListener("DOMContentLoaded", async () => {
  // Проверяем, есть ли результат редиректа (для Safari)
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      // Пользователь вернулся после редиректа в Safari
      const user = result.user;
      console.log("Пользователь вошёл после редиректа:", user);
      
      // Сохраняем UID пользователя
      localStorage.setItem("uid", user.uid);
      
      // Закрываем модальное окно, если оно открыто
      const loginModalEl = document.getElementById("loginModal");
      if (loginModalEl) {
        const loginModal = bootstrap.Modal.getInstance(loginModalEl);
        if (loginModal) {
          loginModal.hide();
          // Удаляем backdrop и очищаем стили после закрытия
          document.body.classList.remove('modal-open');
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) {
            backdrop.remove();
          }
        }
      }
    }
  } catch (error) {
    console.error("Ошибка при обработке редиректа:", error);
  }
});
