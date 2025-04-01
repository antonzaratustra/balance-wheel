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
async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    
    // Определяем, является ли браузер Safari
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    let user;
    
    if (isSafari) {
      // Для Safari используем signInWithRedirect
      console.log("Используем signInWithRedirect для Safari");
      await signInWithRedirect(auth, provider);
      // Примечание: результат будет обработан при перезагрузке страницы
      // в обработчике getRedirectResult
      return null; // Возвращаем null, так как пользователь будет доступен только после редиректа
    } else {
      // Для других браузеров используем signInWithPopup
      const result = await signInWithPopup(auth, provider);
      user = result.user;
      console.log("Пользователь вошёл:", user);
      
      // Сохраняем UID пользователя
      localStorage.setItem("uid", user.uid);
      
      // Закрываем модальное окно после успешного входа
      const loginModalEl = document.getElementById("loginModal");
      if (loginModalEl) {
        const loginModal = bootstrap.Modal.getInstance(loginModalEl);
        if (loginModal) {
          loginModal.hide();
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
        }
      }
    }
  } catch (error) {
    console.error("Ошибка при обработке редиректа:", error);
  }

  // Находим элементы модального окна и кнопки
  const loginBtn = document.getElementById("loginBtn");
  const loginModalEl = document.getElementById("loginModal");
  const loginModal = new bootstrap.Modal(loginModalEl, {
    backdrop: "static",
    keyboard: true
  });

  // По клику на кнопку "Login" показываем модальное окно
  loginBtn.addEventListener("click", () => {
    loginModalEl.addEventListener('hidden.bs.modal', () => {
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    });
    loginModal.show();
  });

  // Обработчик для кнопки "Войти через Google"
  const googleSignInBtn = document.getElementById("googleSignInBtn");
  googleSignInBtn.addEventListener("click", async () => {
    try {
      const user = await signInWithGoogle();
      // Закрываем модальное окно только если это не Safari (для Safari редирект уже произошел)
      if (user !== null) {
        loginModal.hide();
      }
    } catch (error) {
      // Ошибки уже обрабатываются в signInWithGoogle
    }
  });
});
