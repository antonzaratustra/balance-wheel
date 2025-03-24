// main.js
import { auth } from "./firebase-init.js";
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

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
    
    // Сначала проверяем текущее состояние аутентификации
    const currentUser = await checkAuthState();
    if (currentUser) {
      return currentUser;
    }

    // Вызываем signInWithPopup
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Пользователь вошёл:", user);
    
    // Сохраняем UID пользователя
    localStorage.setItem("uid", user.uid);
    return user;
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
document.addEventListener("DOMContentLoaded", () => {
  // Находим элементы модального окна и кнопки
  const loginBtn = document.getElementById("loginBtn");
  const loginModalEl = document.getElementById("loginModal");
  const loginModal = new bootstrap.Modal(loginModalEl, {
    backdrop: "static",
    keyboard: true
  });

  // По клику на кнопку "Login" показываем модальное окно
  loginBtn.addEventListener("click", () => {
    loginModal.show();
  });

  // Обработчик для кнопки "Войти через Google"
  const googleSignInBtn = document.getElementById("googleSignInBtn");
  googleSignInBtn.addEventListener("click", async () => {
    try {
      await signInWithGoogle();
      loginModal.hide();
    } catch (error) {
      // Ошибки уже обрабатываются в signInWithGoogle
    }
  });
});
