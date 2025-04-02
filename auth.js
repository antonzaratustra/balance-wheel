// main.js
import { auth } from "./firebase-init.js";
import { GoogleAuthProvider, signInWithPopup, getRedirectResult } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Функция для инициализации аутентификации
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
  }
});

// Функция для входа через Google
export async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    
    // Используем signInWithPopup для всех устройств
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
  } catch (error) {
    console.error("Ошибка авторизации:", error);
    if (error.code !== "auth/cancelled-popup-request") {
      alert("Ошибка входа: " + error.message);
    }
    throw error;
  }
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
