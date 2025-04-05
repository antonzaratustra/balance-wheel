// main.js
import { auth } from "./firebase-init.js";
import { GoogleAuthProvider, signInWithPopup, getRedirectResult, signInWithRedirect } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Функция для инициализации аутентификации
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Проверяем результат редиректа
    console.log("Проверка результата редиректа при загрузке страницы");
    const result = await getRedirectResult(auth);
    if (result) {
      const user = result.user;
      console.log("Пользователь вошёл после редиректа:", user);
      localStorage.setItem("uid", user.uid);
      updateUIForAuthenticatedUser(user);
      
      // Закрываем модальное окно после успешной авторизации
      const loginModalEl = document.getElementById("loginModal");
      if (loginModalEl) {
        const loginModal = bootstrap.Modal.getInstance(loginModalEl);
        if (loginModal) {
          loginModal.hide();
          document.body.classList.remove('modal-open');
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) backdrop.remove();
        }
      }
    } else {
      console.log("Результат редиректа отсутствует при загрузке страницы");
    }

    // Проверяем текущее состояние аутентификации
    const currentUser = auth.currentUser;
    if (currentUser) {
      console.log("Пользователь уже авторизован:", currentUser);
      localStorage.setItem("uid", currentUser.uid);
      updateUIForAuthenticatedUser(currentUser);
    } else {
      console.log("Пользователь не авторизован");
      updateUIForUnauthenticatedUser();
    }

    // Устанавливаем слушатель изменения состояния аутентификации
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("Состояние аутентификации обновлено:", user);
        localStorage.setItem("uid", user.uid);
        updateUIForAuthenticatedUser(user);
      } else {
        console.log("Пользователь вышел из системы");
        localStorage.removeItem("uid");
        updateUIForUnauthenticatedUser();
      }
    });

  } catch (error) {
    console.error("Ошибка при инициализации аутентификации:", error);
    
    // Очищаем UI при ошибке
    const loginModalEl = document.getElementById("loginModal");
    if (loginModalEl) {
      const loginModal = bootstrap.Modal.getInstance(loginModalEl);
      if (loginModal) {
        loginModal.hide();
        document.body.classList.remove('modal-open');
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) backdrop.remove();
      }
    }
    
    // Показываем ошибку пользователю
    // Игнорируем ошибки, связанные с отменой попапа и COOP (Cross-Origin-Opener-Policy)
    if (error.code !== "auth/cancelled-popup-request" && 
        !error.message.includes("Cross-Origin-Opener-Policy") && 
        !error.message.includes("popup")) {
      alert("Ошибка входа: " + error.message);
    }
  }
});

// Функция для входа через Google
export async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    
    // Используем signInWithRedirect для мобильных устройств
    if (isMobileDevice()) {
      console.log("Начинаем редирект для мобильного устройства");
      // Очищаем UI перед редиректом
      const loginModalEl = document.getElementById("loginModal");
      if (loginModalEl) {
        const loginModal = bootstrap.Modal.getInstance(loginModalEl);
        if (loginModal) {
          loginModal.hide();
          document.body.classList.remove('modal-open');
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) backdrop.remove();
        }
      }
      await signInWithRedirect(auth, provider);
      // Результат редиректа будет обработан в обработчике DOMContentLoaded
      return null;
    } else {
      // Для десктопа используем signInWithPopup
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      console.log("Пользователь вошёл:", user);
      localStorage.setItem("uid", user.uid);
      
      // Закрываем модальное окно после успешной авторизации
      const loginModalEl = document.getElementById("loginModal");
      if (loginModalEl) {
        const loginModal = bootstrap.Modal.getInstance(loginModalEl);
        if (loginModal) {
          loginModal.hide();
          document.body.classList.remove('modal-open');
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) backdrop.remove();
        }
      }
      
      return user;
    }
  } catch (error) {
    console.error("Ошибка авторизации:", error);
    // Игнорируем ошибки, связанные с отменой попапа и COOP (Cross-Origin-Opener-Policy)
    if (error.code !== "auth/cancelled-popup-request" && 
        !error.message.includes("Cross-Origin-Opener-Policy") && 
        !error.message.includes("popup")) {
      alert("Ошибка входа: " + error.message);
    }
    // Не выбрасываем ошибку для мобильных устройств, чтобы процесс аутентификации мог продолжиться
    if (!isMobileDevice()) {
      throw error;
    }
  }
}

// Проверяем, является ли устройство мобильным
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Функции для обновления UI
function updateUIForAuthenticatedUser(user) {
  localStorage.setItem("uid", user.uid);
  
  // Обновляем кнопку логина
  const loginButton = document.getElementById('loginButton');
  if (loginButton) {
    loginButton.innerHTML = '👤 Logout';
  }
  
  // Показываем кнопки сохранения и загрузки результатов
  const saveResultButton = document.getElementById('saveResult');
  const loadResultsButton = document.getElementById('loadResults');
  if (saveResultButton) saveResultButton.style.display = 'inline-block';
  if (loadResultsButton) loadResultsButton.style.display = 'inline-block';
}

function updateUIForUnauthenticatedUser() {
  localStorage.removeItem("uid");
  
  // Обновляем кнопку логина
  const loginButton = document.getElementById('loginButton');
  if (loginButton) {
    loginButton.innerHTML = '👤 Login';
  }
  
  // Скрываем кнопки сохранения и загрузки результатов
  const saveResultButton = document.getElementById('saveResult');
  const loadResultsButton = document.getElementById('loadResults');
  if (saveResultButton) saveResultButton.style.display = 'none';
  if (loadResultsButton) loadResultsButton.style.display = 'none';
}
