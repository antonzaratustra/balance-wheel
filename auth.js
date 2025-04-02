// main.js
import { auth } from "./firebase-init.js";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Функция для проверки аутентификации
function checkAuthState() {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        updateUIForAuthenticatedUser(user);
      } else {
        updateUIForUnauthenticatedUser();
      }
      unsubscribe();
      resolve(user);
    });
  });
}

// Функция для обновления UI для авторизованного пользователя
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

// Функция для обновления UI для неавторизованного пользователя
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
      
      // Добавляем слушатель изменения состояния аутентификации
      return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            console.log("Состояние аутентификации обновлено:", user);
            localStorage.setItem("uid", user.uid);
            
            // Обновляем UI для авторизованного пользователя
            updateUIForAuthenticatedUser(user);
            
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
          }
          unsubscribe();
          resolve(user);
        });
      });
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

// Инициализация аутентификации при загрузке страницы
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Проверяем результат редиректа
    const result = await getRedirectResult(auth);
    if (result) {
      const user = result.user;
      console.log("Пользователь вошёл после редиректа:", user);
      localStorage.setItem("uid", user.uid);
      updateUIForAuthenticatedUser(user);
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
  } catch (error) {
    console.error("Ошибка при инициализации аутентификации:", error);
  }
});
