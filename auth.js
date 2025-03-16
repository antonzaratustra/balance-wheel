// main.js
import { auth } from "./firebase-init.js";
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

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
      const provider = new GoogleAuthProvider();
      // Вызываем модульный API signInWithPopup с нашим объектом auth
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Пользователь вошёл:", user);
      // Закрываем модальное окно
      loginModal.hide();
      // Обновляем текст кнопки "Login" на имя пользователя (или email)
      loginBtn.innerText = user.displayName || user.email || "Profile";
      // Сохраняем UID пользователя (если необходимо)
      localStorage.setItem("uid", user.uid);
    } catch (error) {
      console.error("Ошибка авторизации:", error);
      alert("Ошибка входа: " + error.message);
    }
  });
});
