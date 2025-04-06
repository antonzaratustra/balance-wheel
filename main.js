// Глобальный объект с инструкциями FAQ
const faqInstructions = {
  // Функция для определения целевого элемента в зависимости от targetId
  getTargetElement(targetId) {
    let targetElement;
    let needsScroll = false;

    switch(targetId) {
      case 'langToggle':
        targetElement = window.innerWidth > 576 ? 
          document.getElementById('langToggleDesktop') : 
          document.getElementById('langToggle');
        break;
      case 'themeToggle':
        targetElement = window.innerWidth > 576 ? 
          document.getElementById('themeToggleDesktop') : 
          document.getElementById('themeToggle');
        break;
      case 'faqBtn':
        targetElement = window.innerWidth > 576 ? 
          document.getElementById('faqBtnDesktop') : 
          document.getElementById('faqBtnMobile');
        break;
      case 'healthTab':
        targetElement = document.querySelector('#sphereTabs .nav-link[data-bs-target="#healthTab"]');
        needsScroll = true;
        break;
      case 'timerBtn':
        targetElement = document.querySelector('.timer-button');
        break;
      case 'loginBtn':
        targetElement = window.innerWidth > 576 ? 
          document.getElementById('loginBtn') : 
          document.getElementById('mobile-login-btn');
        needsScroll = true;
        break;
      case 'saveToCloudBtn':
        targetElement = window.innerWidth > 576 ? 
          document.getElementById('saveToCloudBtn') : 
          document.getElementById('mobile-save-btn');
        needsScroll = true;
        break;
      case 'showResultsBtn':
        targetElement = window.innerWidth > 576 ? 
          document.getElementById('showResultsBtn') : 
          document.getElementById('mobile-view-btn');
        needsScroll = true;
        break;
      case 'savePDF':
        targetElement = window.innerWidth > 576 ? 
          document.getElementById('savePDF') : 
          document.getElementById('savePDFMobile');
        needsScroll = true;
        break;
      default:
        targetElement = document.getElementById(targetId);
    }
    return { targetElement, needsScroll };
  },
  ru: `<strong>Добро пожаловать в Mentorist Life Balance Wheel!</strong><br><br>
  Инструмент для оценки баланса жизни по 8 сферам: 🎯 Призвание, 🤝 Отношения, 🏡 Окружение, 💰 Финансы, 📚 Саморазвитие, 🎉 Яркость жизни, 🌀 Духовность и ❤️ Здоровье.<br><br>
  <strong>1. Тема и язык:</strong> <span class="btn-like lang-toggle">🌐 RU</span> и <span class="btn-like theme-toggle">🌙 Тёмная</span> / <span class="btn-like theme-toggle">🌞 Светлая</span>.<br><br>
  <strong>2. Навигация:</strong> <span class="btn-like faq-button">💡 FAQ</span> для инструкции, <span class="btn-like faq-health-button">❤️ Здоровье (5.0)</span> для возврата к сферам, вкладки вверху и клик по секторам колеса для смены сфер.<br><br>
  <strong>3. Оценка:</strong> В каждой сфере представлено 5 утверждений, оценивайте их на слайдерах от 0 до 10. Эмодзи часов <span class="btn-like faq-timer-button">⏱️</span> активирует сфокусированный режим, где вы проходите все утверждения всех сфер за 10 минут.<br><br>
  <strong>4. Подсказки:</strong> Летающий кружочек рядом с курсором показывает простое действие, которое вы можете сделать в текущей сфере прямо сейчас.<br><br>
  <strong>5. Визуализация:</strong> Колесо показывает ваши оценки и автоматическое среднее для каждой сферы и общее.<br><br>
  <strong>6. Сохранение:</strong> <span class="btn-like">👤 Войти</span> для сохранения. Кнопки: <span class="btn-like">💾</span> (сохранить в облако), <span class="btn-like">☁️</span> (загрузить из облака), <span class="btn-like">🔽 PDF</span> (скачать).<br><br>
  <strong>7. История:</strong> Слайдер под колесом для просмотра сохранённых результатов.`,

en: `<strong>Welcome to Mentorist Life Balance Wheel!</strong><br><br>
  Tool for assessing life balance across 8 areas: 🎯 Calling, 🤝 Relationships, 🏡 Environment, 💰 Finance, 📚 Self-Improvement, 🎉 Life Brightness, 🌀 Spirituality, and ❤️ Health.<br><br>
  <strong>1. Theme and Language:</strong> <span class="btn-like lang-toggle">🌐 EN</span> and <span class="btn-like theme-toggle">🌙 Dark</span> / <span class="btn-like theme-toggle">🌞 Light</span>.<br><br>
  <strong>2. Navigation:</strong> <span class="btn-like faq-button">💡 FAQ</span> for instructions, <span class="btn-like faq-health-button">❤️ Health (5.0)</span> to return to spheres, top tabs and clicking wheel sectors to switch between areas.<br><br>
  <strong>3. Assessment:</strong> Each area features 5 statements to evaluate using sliders from 0 to 10. Clock emoji <span class="btn-like faq-timer-button">⏱️</span> activates focused mode where you assess all statements in all areas within 10 minutes.<br><br>
  <strong>4. Tips:</strong> The floating circle near your cursor shows a simple action you can take in the current area right now.<br><br>
  <strong>5. Visualization:</strong> Wheel displays your ratings and automatic averages for each area and overall.<br><br>
  <strong>6. Saving:</strong> <span class="btn-like">👤 Login</span> to save. Buttons: <span class="btn-like">💾</span> (save to cloud), <span class="btn-like">☁️</span> (load from cloud), <span class="btn-like">🔽 PDF</span> (download).<br><br>
  <strong>7. History:</strong> Slider below wheel to view saved results.`
};

// Импорт auth из firebase-init.js
import { auth } from "./firebase-init.js";
import { DejaVuSansTTF } from './fonts.js';
import { spheres } from './js/spheres.js';
import { initFloatingTooltip } from './js/floating-tooltip.js';
import { highlightElement } from './js/highlight-element.js';

// Импорт нужных методов из firebase/auth
import {
  signOut,
  onAuthStateChanged,
  getRedirectResult
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Импорт функции авторизации через Google
import { signInWithGoogle } from './auth.js';

import {
  saveResultToFirestore,
  loadResultsList,
  loadSavedResult,
  deleteSavedResult
} from "./firestore-utils.js";

// Функции для работы с localStorage
function saveSettingsToLocalStorage(language, isDarkMode) {
  try {
    localStorage.setItem('balanceWheel_language', language);
    localStorage.setItem('balanceWheel_darkMode', isDarkMode ? 'true' : 'false');
    console.log('Настройки сохранены в localStorage:', { language, isDarkMode });
  } catch (error) {
    console.error('Ошибка при сохранении настроек в localStorage:', error);
  }
}

function loadSettingsFromLocalStorage() {
  try {
    const savedLanguage = localStorage.getItem('balanceWheel_language');
    const savedDarkMode = localStorage.getItem('balanceWheel_darkMode');
    
    return {
      language: savedLanguage || 'en',
      darkMode: savedDarkMode === null ? true : savedDarkMode === 'true'
    };
  } catch (error) {
    console.error('Ошибка при загрузке настроек из localStorage:', error);
    return { language: 'en', darkMode: true };
  }
}

// Глобальная переменная для темного режима
let darkMode = true;

document.addEventListener("DOMContentLoaded", () => {
  // Загружаем сохраненные настройки из localStorage
  const savedSettings = loadSettingsFromLocalStorage();

  // Добавляем обработчики для кликабельных элементов в FAQ
  document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('btn-like')) return;
    
    const btnText = e.target.textContent.trim();
    const tooltipText = currentLanguage === 'ru' ? 'я здесь' : 'I am here';
    let targetId;

    // Определяем targetId на основе текста кнопки
    if (btnText.includes('🌐')) targetId = 'langToggle';
    else if (btnText.includes('🌙') || btnText.includes('🌞')) targetId = 'themeToggle';
    else if (btnText.includes('💡')) targetId = 'faqBtn';
    else if (btnText.includes('❤️')) targetId = 'healthTab';
    else if (btnText.includes('⏱️')) targetId = 'timerBtn';
    else if (btnText.includes('👤')) targetId = 'loginBtn';
    else if (btnText.includes('💾')) targetId = 'saveToCloudBtn';
    else if (btnText.includes('☁️')) targetId = 'showResultsBtn';
    else if (btnText.includes('🔽')) targetId = 'savePDF';

    if (targetId) {
      const { targetElement, needsScroll } = faqInstructions.getTargetElement(targetId);
      if (targetElement) {
        // Передаем элемент напрямую в highlightElement, так как логика определения
        // целевого элемента уже реализована в highlight-element.js
        highlightElement(targetElement, tooltipText, needsScroll);
      }
    }
  });
  
  // Устанавливаем язык из сохраненных настроек или по умолчанию английский
  window.currentLanguage = savedSettings.language;
  
  // Устанавливаем тему из сохраненных настроек
  darkMode = savedSettings.darkMode;
  document.body.classList.toggle("dark-mode", darkMode);
  
  showEmojiExplosion();

  // Локализация модалки логина
  const loginModalLabel = document.getElementById("loginModalLabel");
  const modalBodyText = document.querySelector("#loginModal .modal-body p");
  if (loginModalLabel) loginModalLabel.innerText = "Login";
  if (modalBodyText) modalBodyText.innerText = "Sign in with:";

  // Добавляем обработчик поворота устройства
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', rotateCanvas);
  }

  // Добавляем обработчик для мобильной кнопки PDF
  const savePDFMobileBtn = document.getElementById('savePDFMobile');
  if (savePDFMobileBtn) {
    savePDFMobileBtn.addEventListener('click', () => {
      const savePDFBtn = document.getElementById('savePDF');
      if (savePDFBtn) {
        savePDFBtn.click(); // Вызываем клик на десктопной кнопке
      }
    });
  }
  
  // Удаляем "загрузчик"
  const loader = document.getElementById("loader");
  if (loader) {
    loader.remove();
  }

  function initLoadingAnimation() {
    const colMd7 = document.querySelector('.col-md-7');
    const canvasWrapper = document.getElementById('canvas-wrapper');
    const faqContent = document.getElementById('faqContent');
    
    colMd7.classList.add('loading');
    canvasWrapper.classList.add('loading');
    faqContent.classList.add('loading');
    
    setTimeout(() => {
      colMd7.classList.remove('loading');
      canvasWrapper.classList.remove('loading');
      faqContent.classList.remove('loading');
    }, 50);
  }
  initLoadingAnimation();

  // Глобальная переменная для определения мобильного устройства
  let isMobile = window.innerWidth < 576;
  window.addEventListener("resize", () => {
    isMobile = window.innerWidth < 576;
  });

  function fillCanvasBackground(canvas, color) {
    const ctx = canvas.getContext("2d");
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }

  /***************************************************
   * 1. ПАРАМЕТРЫ ПО УМОЛЧАНИЮ: ТЁМНАЯ ТЕМА + АНГЛИЙСКИЙ
   ***************************************************/
  // Делаем переменную доступной глобально для модуля floating-tooltip.js
  window.wheelSectors = [];
  let wheelSectors = window.wheelSectors; // Глобальный массив для хранения геометрии секторов колеса

  // Объект для текстов кнопок (используем и для десктопа, и для мобильной версии)
  const buttonTexts = {
    ru: {
      save: '💾 Сохранить',
      login: '👤 Войти',
      logout: '👤 Выйти',
      view: '☁️ Просмотреть'
    },
    en: {
      save: '💾 Save',
      login: '👤 Login',
      logout: '👤 Logout',
      view: '☁️ Results'
    }
  };

  // ================== БЛОК С МОДАЛЬНЫМИ ОКНАМИ ==================
  const modalTranslations = {
    ru: {
      savedToCloud: "Успех",
      savedToCloudContent: "Результат сохранён",
      loaded: "Успех",
      loadedContent: "Результат загружен",
      deleteConfirm: "Внимание",
      deleteConfirmContent: "Удалить результат?",
      deleted: "Успех",
      deletedContent: "Результат удален",
      loginRequired: "Вход",
      loginRequiredContent: "Сначала войдите в систему!",
      myResults: "Результаты",
      success: "Успех",
      delete: "Удалить",
      noResults: "Нет результатов",
      load: "Загрузить",
      cancel: "Отмена"
    },
    en: {
      savedToCloud: "Success",
      savedToCloudContent: "Result saved",
      loaded: "Success",
      loadedContent: "Result loaded",
      deleteConfirm: "Warning",
      deleteConfirmContent: "Delete result?",
      deleted: "Success",
      deletedContent: "Result deleted",
      loginRequired: "Login",
      loginRequiredContent: "Please log in first!",
      myResults: "Results",
      success: "Success",
      delete: "Delete",
      noResults: "No results",
      load: "Load",
      cancel: "Cancel"
    }
  };

  /**
   * Универсальная функция показа модального окна по ID.  
   * messageKey — ключ для перевода (например 'loginRequired'),
   * чтобы заголовок и текст подставились из modalTranslations.
   */
  function showModal(modalId, messageKey = null) {
    const modal = document.getElementById(modalId);
    if (modal && messageKey) {
      const modalTitle = modal.querySelector('.modal-title');
      const modalBody = modal.querySelector('.modal-body');
      const translations = modalTranslations[currentLanguage];
      if (modalTitle) {
        modalTitle.textContent = translations[messageKey] || translations.success;
      }
      if (modalBody) {
        modalBody.textContent = translations[`${messageKey}Content`] || translations.success;
      }
    }
    if (modal) {
      new bootstrap.Modal(modal).show();
    }
  }

  /**
   * Окно подтверждения удаления
   */
  function showConfirmDeleteModal(onConfirm) {
    const modal = document.getElementById('confirmDeleteModal');
    if (modal) {
      const translations = modalTranslations[currentLanguage];
      const modalTitle = modal.querySelector('.modal-title');
      const modalBody = modal.querySelector('.modal-body');
      const confirmBtn = modal.querySelector('.btn-danger');
      const cancelBtn = modal.querySelector('.btn-secondary');
      
      if (modalTitle) {
        modalTitle.textContent = translations.deleteConfirm;
      }
      if (modalBody) {
        modalBody.textContent = translations.deleteConfirmContent;
      }
      if (confirmBtn) {
        confirmBtn.textContent = translations.delete;
        confirmBtn.onclick = () => {
          const modalInstance = bootstrap.Modal.getInstance(modal);
          if (modalInstance) {
            modalInstance.hide();
          }
          onConfirm();
        };
      }
      if (cancelBtn) {
        cancelBtn.textContent = translations.cancel || 'Cancel';
      }
      new bootstrap.Modal(modal).show();
    }
  }
  // ==============================================================

  // ===================== БЛОК С АВТОРИЗАЦИЕЙ =====================
  // Кнопки входа/выхода (десктоп + мобильный)
  const loginBtn = document.getElementById("loginBtn");
  const mobileLoginBtn = document.getElementById('mobile-login-btn');

  // Модальное окно логина
  const loginModalEl = document.getElementById("loginModal");

  // Кнопка Google внутри этой модалки
  const googleSignInBtn = document.getElementById("googleSignInBtn");

  // Отображение имени пользователя (в шапке десктопа и мобильного)
  const userInfo = document.getElementById("userInfo"); 
  const userInfoMobile = document.getElementById("userInfo-mobile"); 

  // Универсальная функция входа через Google
  // Функция signInWithGoogle импортирована из auth.js

  // Обработчик нажатия «Войти через Google» (кнопка в модалке `loginModal`)
  if (googleSignInBtn) {
    googleSignInBtn.addEventListener("click", async () => {
      try {
        const user = await signInWithGoogle();
        if (user) {
          // Закрываем модалку после успешного входа
          const loginModal = bootstrap.Modal.getInstance(loginModalEl);
          if (loginModal) {
            loginModal.hide();
          }
          // Обновляем UI-кнопки (логин/логаут)
          updateLoginButtons();
        }
      } catch (error) {
        console.error("Ошибка при входе:", error);
      }
    });
  }

  // Функция выхода
  function handleSignOut() {
    signOut(auth)
      .then(() => {
        console.log("Пользователь вышел");
        // Скрываем слайдер истории
        document.getElementById("historySliderContainer").classList.add("d-none");
      })
      .catch((err) => {
        console.error("Ошибка при выходе:", err);
      });
  }

  // Единая функция-обработчик клика по кнопке Login/Logout (десктоп и мобильная)
  let isLoginModalOpen = false;

  function handleLoginClick() {
      if (auth.currentUser) {
          // Уже залогинен – выходим
          handleSignOut();
      } else if (!isLoginModalOpen) {
          // Не залогинен и окно не открыто – показываем окно входа
          const loginModal = new bootstrap.Modal(loginModalEl, {
              backdrop: true,
              keyboard: true
          });
          loginModal.show();
          isLoginModalOpen = true;
  
          // Событие закрытия модального окна
          loginModalEl.addEventListener('hidden.bs.modal', () => {
              isLoginModalOpen = false;
              document.body.classList.remove('modal-open');
              const backdrop = document.querySelector('.modal-backdrop');
              if (backdrop) {
                  backdrop.remove();
              }
          });

          // Кнопка входа через Google уже имеет обработчик в auth.js
      }
  }

  // Навешиваем обработчик на обе кнопки входа (десктоп и мобильная)
  loginBtn.addEventListener("click", handleLoginClick);
  mobileLoginBtn.addEventListener("click", handleLoginClick);

  // ===================== КОНЕЦ БЛОКА АВТОРИЗАЦИИ =====================

  // ===================== БЛОК С СОХРАНЕНИЕМ/ПРОСМОТРОМ =====================
  // Десктопные кнопки
  const saveToCloudBtn = document.getElementById("saveToCloudBtn");
  const showResultsBtn = document.getElementById("showResultsBtn");

  // Мобильные кнопки
  const mobileSaveBtn = document.getElementById('mobile-save-btn');
  const mobileViewBtn = document.getElementById('mobile-view-btn');

  // Функция для сохранения результата
  async function saveResult() {
    try {
      await saveResultToFirestore(new Date().toLocaleString(), spheres);
      showModal('saveSuccessModal', 'savedToCloud');
      // Обновляем слайдер истории после сохранения
      initializeHistorySlider();
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
    }
  }

  // Обработчик десктопной кнопки «Сохранить»
  if (saveToCloudBtn) {
    saveToCloudBtn.addEventListener('click', () => {
      if (!auth.currentUser) {
        // Если не залогинен, показываем окно входа
        const loginModal = new bootstrap.Modal(loginModalEl);
        loginModal.show();
        return;
      }
      saveResult();
    });
  }

  // Обработчики мобильных кнопок (save/view)
  mobileSaveBtn.addEventListener('click', () => {
    if (!auth.currentUser) {
      const loginModal = new bootstrap.Modal(loginModalEl);
      loginModal.show();
      return;
    }
    saveResult();
  });

  mobileViewBtn.addEventListener('click', () => {
    if (!auth.currentUser) {
      const loginModal = new bootstrap.Modal(loginModalEl);
      loginModal.show();
      return;
    }
    // Показываем модалку результатов
    showResultsModal();
  });

  // Десктопная кнопка «Показать результаты»
  showResultsBtn.addEventListener("click", () => {
    if (!auth.currentUser) {
      const loginModal = new bootstrap.Modal(loginModalEl);
      loginModal.show();
      return;
    }
    showResultsModal();
  });

  // Функция показа модалки «Мои результаты»
  async function showResultsModal() {
    const resultsModalEl = document.getElementById("resultsModal");
    const resultsModal = new bootstrap.Modal(resultsModalEl, {
      backdrop: "static",
      keyboard: true
    });

    try {
      const entries = await loadResultsList();
      const resultsListEl = document.getElementById("resultsList");
      resultsListEl.innerHTML = "";

      if (entries.length === 0) {
        // Показываем "нет результатов"
        const noResultsDiv = document.createElement("div");
        noResultsDiv.classList.add("text-center", "py-4");

        const travoltaImg = document.createElement("img");
        travoltaImg.src = "img/travolta.gif";
        travoltaImg.alt = "Нет результатов";
        travoltaImg.style.maxWidth = "200px";

        const noResultsText = document.createElement("p");
        noResultsText.classList.add("mt-3", "text-muted");
        noResultsText.textContent = (currentLanguage === "ru")
          ? "Пока нет сохранённых результатов"
          : "No saved results yet";

        noResultsDiv.appendChild(travoltaImg);
        noResultsDiv.appendChild(noResultsText);
        resultsListEl.appendChild(noResultsDiv);

      } else {
        // Если результаты есть, рисуем список
        entries.forEach((entry) => {
          const row = document.createElement("div");
          row.classList.add("d-flex", "justify-content-between", "align-items-center", "mb-2");

          const titleSpan = document.createElement("span");
          titleSpan.style.flexGrow = "1";
          titleSpan.style.marginRight = "1rem";

          // Преобразуем дату
          const dateStr = entry.createdAt?.seconds
            ? new Date(entry.createdAt.seconds * 1000).toLocaleString()
            : new Date().toLocaleString();
          titleSpan.textContent = dateStr;

          const buttonsContainer = document.createElement("div");
          buttonsContainer.classList.add("d-flex", "align-items-center");
          buttonsContainer.style.flexShrink = "0";

          const loadBtn = document.createElement("button");
          loadBtn.className = "btn btn-sm btn-primary me-2";
          loadBtn.textContent = "▶️";
          loadBtn.style.width = "40px";

          const delBtn = document.createElement("button");
          delBtn.className = "btn btn-sm btn-danger";
          delBtn.textContent = "❌";
          delBtn.style.width = "40px";

          // Загрузка сохранённого результата
          loadBtn.addEventListener("click", async () => {
            const data = await loadSavedResult(entry.id);
            if (!data) {
              showModal("loadErrorModal", 'loaded');
              return;
            }
            // Применяем данные к слайдерам
            Object.keys(data).forEach(sphereId => {
              const sphereData = data[sphereId];
              Object.keys(sphereData).forEach(questionId => {
                const slider = document.getElementById(`slider_${sphereId}_${questionId}`);
                if (slider) {
                  slider.value = sphereData[questionId];
                  updateSliderDisplay(sphereId, questionId, sphereData[questionId]);
                }
              });
              updateSphereAverage(sphereId);
            });
            updateOverallAverage();
            drawWheel();

            // Закрываем модалку «Результаты» и показываем «Успех загружено»
            const modalInstance = bootstrap.Modal.getInstance(resultsModalEl);
            if (modalInstance) modalInstance.hide();
            showModal("loadSuccessModal", 'loaded');
          });

          // Удаление сохранённого результата
          delBtn.addEventListener("click", () => {
            showConfirmDeleteModal(async () => {
              try {
                await deleteSavedResult(entry.id);
                const modalInstance = bootstrap.Modal.getInstance(resultsModalEl);
                if (modalInstance) {
                  modalInstance.hide();
                }
                // Обновляем список
                showResultsModal();
                initializeHistorySlider();
                showModal("deleteSuccessModal", 'deleted');
              } catch (error) {
                console.error("Ошибка при удалении:", error);
                showModal("deleteErrorModal", 'deleteConfirm');
              }
            });
          });

          buttonsContainer.appendChild(loadBtn);
          buttonsContainer.appendChild(delBtn);
          row.appendChild(titleSpan);
          row.appendChild(buttonsContainer);
          resultsListEl.appendChild(row);
        });
      }

      // Заголовок «Мои результаты»
      const resultsModalTitle = document.querySelector('#resultsModal .modal-title');
      if (resultsModalTitle) {
        resultsModalTitle.textContent = modalTranslations[currentLanguage].myResults;
      }

      resultsModal.show();

    } catch (error) {
      console.error("Ошибка при загрузке результатов:", error);
      showModal("loadErrorModal", 'loaded');
    }
  }
  // ==================== КОНЕЦ БЛОКА СОХРАНЕНИЯ/ПРОСМОТРА ====================


  // ==================  ФУНКЦИИ ОБНОВЛЕНИЯ ТЕКСТА КНОПОК и USERINFO  ====================
  function updateLoginButtons() {
    if (auth.currentUser) {
      // Пользователь залогинен
      loginBtn.innerText = (currentLanguage === 'ru') ? '👤 Выйти' : '👤 Logout';
      mobileLoginBtn.textContent = (currentLanguage === 'ru') ? '👤 Выйти' : '👤 Logout';
    } else {
      // Не залогинен
      loginBtn.innerText = (currentLanguage === 'ru') ? '👤 Войти' : '👤 Login';
      mobileLoginBtn.textContent = (currentLanguage === 'ru') ? '👤 Войти' : '👤 Login';
    }
  }

  function updateSaveButtons() {
    // Десктоп
    if (saveToCloudBtn) {
      saveToCloudBtn.innerText = buttonTexts[currentLanguage].save;
    }
    if (showResultsBtn) {
      showResultsBtn.innerText = buttonTexts[currentLanguage].view;
    }
    // Мобильные
    if (mobileSaveBtn) {
      mobileSaveBtn.innerText = buttonTexts[currentLanguage].save;
    }
    if (mobileViewBtn) {
      mobileViewBtn.innerText = buttonTexts[currentLanguage].view;
    }
  }

  // Обновление имени/email пользователя в шапке
  function updateUserInfo() {
    const user = auth.currentUser;
    if (user) {
      const displayName = user.displayName || user.email || "";
      userInfo.textContent = displayName;
      userInfoMobile.textContent = displayName;
    } else {
      userInfo.textContent = "";
      userInfoMobile.textContent = "";
    }
  }

  function updateUILanguage() {
    // Кнопки «Login/Logout» + «Save/View»
    updateLoginButtons();
    updateSaveButtons();
    // Имя пользователя
    updateUserInfo();
    // Сохраняем подсветку активного сектора при смене языка
    if (activeWheelSector) {
        highlightSector(activeWheelSector, true, true);
    }

    // Локализация самой модалки логина
    const loginModalLabel = document.getElementById("loginModalLabel");
    const modalBodyText = document.querySelector("#loginModal .modal-body p");
    window.currentLanguage = currentLanguage; // Обновляем значение в window.currentLanguage
    if (currentLanguage === "ru") {
      if (loginModalLabel) loginModalLabel.innerText = "Вход";
      if (modalBodyText) modalBodyText.innerText = "Войдите с помощью:";
    } else {
      if (loginModalLabel) loginModalLabel.innerText = "Login";
      if (modalBodyText) modalBodyText.innerText = "Sign in with:";
    }
  }
  // ===========================================================================


  // ======================== onAuthStateChanged ================================
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("Пользователь авторизован:", user);
      updateLoginButtons();
      updateSaveButtons();
      updateUserInfo();
      initializeHistorySlider(); // Добавляем инициализацию слайдера истории
    } else {
      console.log("Пользователь не авторизован");
      updateLoginButtons();
      updateSaveButtons();
    }
  });
  // ===========================================================================


  // ======================== БЛОК С ПРОВЕРКОЙ СОСТОЯНИЯ АВТОРИЗАЦИИ ================================
  if (typeof document.addEventListener === 'function') {
    document.addEventListener('visibilitychange', async () => {
      if (document.visibilityState === 'visible') {
        try {
          console.log("Проверка результата редиректа после возвращения на страницу");
          const result = await getRedirectResult(auth);
          if (result) {
            const user = result.user;
            console.log("Пользователь вошёл после редиректа:", user);
            localStorage.setItem("uid", user.uid);
            // Обновляем UI после успешной авторизации
            updateLoginButtons();
            updateSaveButtons();
            updateUserInfo();
            
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
            console.log("Результат редиректа отсутствует или пользователь не авторизован");
            // Проверяем текущего пользователя
            const currentUser = auth.currentUser;
            if (currentUser) {
              console.log("Текущий пользователь:", currentUser);
              localStorage.setItem("uid", currentUser.uid);
              updateLoginButtons();
              updateSaveButtons();
              updateUserInfo();
            }
          }
        } catch (error) {
          console.error("Ошибка при проверке аутентификации:", error);
        }
      }
    });
  }
  // ===========================================================================


  // ======================== РАБОТА С ТАБАМИ/КОЛЕСОМ ==========================
  /**
   * Создание вкладок сфер (и их контента) динамически
   */
  function renderTabs() {
    const savedValues = {};
    spheres.forEach((sphere) => {
      sphere.questions.forEach((question) => {
        const slider = document.getElementById(`slider_${sphere.id}_${question.id}`);
        if (slider) {
          savedValues[sphere.id] = savedValues[sphere.id] || {};
          savedValues[sphere.id][question.id] = slider.value;
        }
      });
    });

    const tabList = document.getElementById("sphereTabs");
    const tabContent = document.getElementById("sphereTabContent");

    // Сохраняем ID активной вкладки, если был
    const activeTabId = document.querySelector("#sphereTabs .nav-link.active")?.id;

    // Очищаем контент
    tabList.innerHTML = "";
    tabContent.innerHTML = "";

    spheres.forEach((sphere) => {
      const li = document.createElement("li");
      li.className = "nav-item";

      const btn = document.createElement("button");
      btn.className = "nav-link sphere-tab-btn"; 
      btn.id = "tab-" + sphere.id;
      btn.type = "button";
      btn.setAttribute("data-color", sphere.color);
      btn.setAttribute("data-bs-toggle", "tab");
      btn.setAttribute("data-bs-target", "#pane-" + sphere.id);
      btn.role = "tab";

      let avg = (5.0).toFixed(1);
      if (savedValues[sphere.id]) {
        let sum = 0, count = 0;
        for (const key in savedValues[sphere.id]) {
          sum += parseInt(savedValues[sphere.id][key]);
          count++;
        }
        if (count) {
          avg = (sum / count).toFixed(1);
        }
      }
      const isMob = window.innerWidth < 576;
      if (isMob) {
        btn.innerHTML = `<span class="tab-emoji">${sphere.emoji || ""}</span> <span class="tab-average">${avg}</span>`;
      } else {
        btn.innerHTML = `<span class="tab-emoji">${sphere.emoji || ""}</span> <span class="tab-title">${sphere.title[currentLanguage]}</span> <span class="tab-average">(${avg})</span>`;
      }
      li.appendChild(btn);
      tabList.appendChild(li);

      const pane = document.createElement("div");
      pane.className = "tab-pane fade";
      pane.id = "pane-" + sphere.id;
      pane.role = "tabpanel";

      const header = document.createElement("h5");
      header.innerText = `${sphere.emoji || ""} ${sphere.title[currentLanguage]} - ${avg}`;
      header.className = "mb-3 mt-3";
      pane.appendChild(header);

      sphere.questions.forEach((question) => {
        const formGroup = document.createElement("div");
        formGroup.className = "mb-3";

        const label = document.createElement("label");
        label.className = "form-label sphere-header";
        label.setAttribute("for", `slider_${sphere.id}_${question.id}`);
        label.innerText = question.title[currentLanguage];
        formGroup.appendChild(label);

        const sliderWrapper = document.createElement("div");
        sliderWrapper.className = "slider-wrapper";

        const rangeContainer = document.createElement("div");
        rangeContainer.className = "range-container";

        const slider = document.createElement("input");
        slider.type = "range";
        slider.className = "form-range slider-control";
        slider.id = `slider_${sphere.id}_${question.id}`;
        slider.min = "0";
        slider.max = "10";
        slider.value = (savedValues[sphere.id] && savedValues[sphere.id][question.id]) || "5";
        slider.style.setProperty('--slider-thumb-color', sphere.color);

        slider.addEventListener("input", () => {
          updateSliderDisplay(sphere.id, question.id, slider.value);
          updateSphereAverage(sphere.id);
          drawWheel();
          // Подсвечиваем активный сектор при движении слайдера только если это текущий активный сектор
          if (activeWheelSector === sphere.id) {
            highlightSector(sphere.id, true, true);
          }
        });

        const desc = document.createElement("div");
        desc.id = `desc_${sphere.id}_${question.id}`;
        desc.className = "form-text slider-desc";
        const initVal = slider.value;
        desc.innerText = question.descriptions[initVal]
          ? question.descriptions[initVal][currentLanguage]
          : '';

        let val = parseInt(initVal, 10);
        let fraction = val / 10;
        let r = Math.round(255 * (1 - fraction));
        let g = Math.round(255 * fraction);
        desc.style.color = `rgb(${r}, ${g}, 0)`;

        rangeContainer.appendChild(slider);
        sliderWrapper.appendChild(rangeContainer);
        sliderWrapper.appendChild(desc);
        formGroup.appendChild(sliderWrapper);
        pane.appendChild(formGroup);
      });

      tabContent.appendChild(pane);
    });

    updateOverallAverage();

    // Если до этого какая-то вкладка была активна — восстанавливаем
    if (activeTabId) {
      const newActiveTab = document.getElementById(activeTabId);
      if (newActiveTab) {
        newActiveTab.classList.add("active");
        const paneId = newActiveTab.getAttribute("data-bs-target");
        const activePane = document.querySelector(paneId);
        if (activePane) {
          activePane.classList.add("show", "active");
        }
      }
    }

    // Подключаем обработчики на вкладки
    const tabLinks = document.querySelectorAll("#sphereTabs .nav-link");
    tabLinks.forEach(tab => {
      tab.addEventListener('click', () => {
        const sphereId = tab.id.split('-')[1];
        highlightActiveSector(sphereId);
      });

      // Дополнительные «красивости»
      tab.addEventListener("shown.bs.tab", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        updateTabStyles();
      });
      tab.addEventListener("hidden.bs.tab", () => {
        updateTabStyles();
      });
      tab.addEventListener('mouseenter', () => {
        tab.style.boxShadow = `0 0 7px 2.5px ${tab.getAttribute("data-color")}`;
      });
      tab.addEventListener('mouseleave', () => {
        tab.style.boxShadow = 'none';
      });
    });

    updateTabStyles();
  }

  function updateTabStyles() {
    const tabLinks = document.querySelectorAll("#sphereTabs .nav-link");
    tabLinks.forEach(tab => {
      if (tab.classList.contains("active")) {
        tab.style.backgroundColor = tab.getAttribute("data-color");
        tab.style.color = "#333333";
      } else {
        tab.style.backgroundColor = "";
        tab.style.color = darkMode ? "#fff" : "#000";
      }
    });
  }

  function updateSliderDisplay(sphereId, questionId, value) {
    const sphere = spheres.find(s => s.id === sphereId);
    if (!sphere) return;
    const question = sphere.questions.find(q => q.id === questionId);
    if (!question) return;
    
    // Обновляем числовое значение (если есть)
    const displayElement = document.getElementById(`value_${sphereId}_${questionId}`);
    if (displayElement) {
        displayElement.textContent = value;
    }
    
    // Обновляем текстовое описание и его цвет
    const descElem = document.getElementById(`desc_${sphereId}_${questionId}`);
    if (descElem) {
        const dict = question.descriptions[value];
        descElem.innerText = dict ? dict[currentLanguage] : "";

        let val = parseInt(value, 10);
        let fraction = val / 10;
        let r = Math.round(255 * (1 - fraction));
        let g = Math.round(255 * fraction);
        descElem.style.color = `rgb(${r}, ${g}, 0)`;
    }
    
    // Обновляем среднее значение и колесо
    updateSphereAverage(sphereId);
    drawWheel();
    
    // Сохраняем подсветку активного сектора
    if (activeWheelSector) {
        highlightSector(activeWheelSector, true, true);
    }
  }

  function updateSphereAverage(sphereId) {
    const sphere = spheres.find(s => s.id === sphereId);
    if (!sphere) return;
    let sum = 0, count = 0;
    sphere.questions.forEach(question => {
      const slider = document.getElementById(`slider_${sphere.id}_${question.id}`);
      sum += parseInt(slider.value);
      count++;
    });

    const avg = (sum / (count || 1)).toFixed(1);
    const tabButton = document.getElementById("tab-" + sphereId);
    const isMobileView = window.innerWidth < 576;

    if (isMobileView) {
      tabButton.innerHTML = `<span class="tab-emoji">${sphere.emoji || ""}</span> <span class="tab-average">${avg}</span>`;
    } else {
      tabButton.innerHTML = `<span class="tab-emoji">${sphere.emoji || ""}</span> <span class="tab-title">${sphere.title[currentLanguage]}</span> <span class="tab-average">(${avg})</span>`;
    }

    const paneHeader = document.querySelector(`#pane-${sphereId} h5`);
    if (paneHeader) {
      paneHeader.innerText = `${sphere.emoji || ""} ${sphere.title[currentLanguage]} - ${avg}`;
    }
    updateOverallAverage();
  }

  function updateOverallAverage() {
    let total = 0, count = 0;
    spheres.forEach(sphere => {
      sphere.questions.forEach(question => {
        const slider = document.getElementById(`slider_${sphere.id}_${question.id}`);
        total += parseInt(slider.value);
        count++;
      });
    });
    const overall = (total / (count || 1)).toFixed(1);
    document.getElementById("overallAverage").innerText =
      (currentLanguage === "ru" ? "Общее среднее: " : "Overall Average: ") + overall;
  }

  // Делаем функцию drawWheel доступной глобально
  window.drawWheel = function(skipHighlight = false) {
    const canvas = document.getElementById("balanceWheel");
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    wheelSectors = [];

    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) / 2 - 30;
    const anglePerSphere = (2 * Math.PI) / spheres.length;
    let startAngle = -Math.PI / 2;
    

    
    // Сохраняем текущий активный и наведенный секторы
    const currentActive = activeWheelSector;
    const currentHovered = hoveredSector;

    // Убедитесь, что контейнер для секторов существует
    const sectorsContainer = document.getElementById('sectorsContainer');
    if (!sectorsContainer) {
        console.error("Container for sectors not found!");
        return;
    }

    // Очищаем контейнер перед отрисовкой
    sectorsContainer.innerHTML = '';

    // Рисуем градации прозрачности
    for (let i = 1; i <= 10; i++) {
      const alpha = 1 - (i * 0.1);
      spheres.forEach((sphere) => {
        let sum = 0, count = 0;
        sphere.questions.forEach((question) => {
          const slider = document.getElementById(`slider_${sphere.id}_${question.id}`);
          sum += parseInt(slider.value);
          count++;
        });
        const avg = sum / (count || 1);
        const fraction = avg / 10;
        const sectorRadius = fraction * maxRadius * (i / 10);

        const endAngle = startAngle + anglePerSphere;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, sectorRadius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = sphere.color || "#CCC";
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.stroke();

        startAngle = endAngle;
      });
      startAngle = -Math.PI / 2; // Сбрасываем для следующей итерации
    }

    // Рисуем текущие заполненные сектора поверх градаций
    spheres.forEach((sphere) => {
      let sum = 0, count = 0;
      sphere.questions.forEach((question) => {
        const slider = document.getElementById(`slider_${sphere.id}_${question.id}`);
        sum += parseInt(slider.value);
        count++;
      });
      const avg = sum / (count || 1);
      const fraction = avg / 10;
      const sectorRadius = fraction * maxRadius;

      const endAngle = startAngle + anglePerSphere;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, sectorRadius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = sphere.color || "#CCC";
      ctx.globalAlpha = 1;
      ctx.fill();
      
      // Устанавливаем прозрачность и цвет для линий
      ctx.strokeStyle = darkMode ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Сохраняем геометрию сектора для tooltip
      wheelSectors.push({
          sphereId: sphere.id,
          startAngle: startAngle,
          endAngle: endAngle,
          radius: sectorRadius,
          sphereObj: sphere
      });

      // Создание элемента для сектора
      const sectorElement = document.createElement('div');
      sectorElement.id = "sector-" + sphere.id;
      sectorElement.className = "sector";
      sectorsContainer.appendChild(sectorElement);

      // Подпись у края сектора
      const midAngle = startAngle + anglePerSphere / 2;
      const labelRadius = Math.min(width, height) / 2 - 80;
      const labelX = centerX + labelRadius * Math.cos(midAngle);
      const labelY = centerY + labelRadius * Math.sin(midAngle);
      
      ctx.save();
      ctx.font = "16px sans-serif";
      ctx.fillStyle = darkMode ? "#fff" : "#000";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${sphere.emoji || ""} ${sphere.title[currentLanguage]}`, labelX, labelY);
      ctx.restore();

      // Число среднего значения для текущего сектора
      const midAngleNum = startAngle + anglePerSphere / 2;
      const radiusNum = maxRadius * 0.5;
      const xNum = centerX + radiusNum * Math.cos(midAngleNum);
      const yNum = centerY + radiusNum * Math.sin(midAngleNum);

      ctx.save();
      ctx.font = "16px sans-serif";
      ctx.fillStyle = darkMode ? "#fff" : "#000";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(Math.round(avg), xNum, yNum);
      ctx.restore();

      startAngle = endAngle;
    });

    // Вызываем функции для отрисовки сетки и подписей
    drawGrid();
    drawLabels();
  }

  // Функция для отрисовки сетки (розы ветров)
  // Функция для отрисовки делений на секторах
  function drawSectorDivisions(sector) {
    const canvas = document.getElementById("balanceWheel");
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(canvas.width, canvas.height) / 2 - 30;

    ctx.save();
    ctx.strokeStyle = darkMode ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)";
    ctx.lineWidth = 1;

    // Рисуем деления от 0 до 10
    for (let i = 1; i <= 10; i++) {
      const radius = (maxRadius * i) / 10;
      const startX = centerX + radius * Math.cos(sector.startAngle);
      const startY = centerY + radius * Math.sin(sector.startAngle);
      const endX = centerX + radius * Math.cos(sector.endAngle);
      const endY = centerY + radius * Math.sin(sector.endAngle);

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.arc(centerX, centerY, radius, sector.startAngle, sector.endAngle);
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawGrid() {
    const canvas = document.getElementById("balanceWheel");
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) / 2 - 30;

    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.strokeStyle = darkMode 
      ? "rgba(255, 255, 255, 0.6)"
      : "rgba(0, 0, 0, 0.6)";
    ctx.lineWidth = 1.5;

    // Концентрические окружности
    for (let i = 1; i <= 10; i++) {
      const radius = maxRadius * (i / 10);
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.stroke();
    }

    // Радиальные линии
    const numDirections = 16;
    for (let i = 0; i < numDirections; i++) {
      const angle = (i * Math.PI * 2) / numDirections;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + maxRadius * Math.cos(angle),
        centerY + maxRadius * Math.sin(angle)
      );
      ctx.stroke();
    }

    ctx.restore();
  }

  // Функция для отрисовки подписей и значений
  function drawLabels() {
    const canvas = document.getElementById("balanceWheel");
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) / 2 - 30;
    const anglePerSphere = (2 * Math.PI) / spheres.length;
    let startAngle = -Math.PI / 2;

    spheres.forEach((sphere) => {
      // Подпись у края сектора
      const midAngle = startAngle + anglePerSphere / 2;
      const labelRadius = maxRadius - 50;
      const labelX = centerX + labelRadius * Math.cos(midAngle);
      const labelY = centerY + labelRadius * Math.sin(midAngle);
      
      ctx.save();
      ctx.font = "16px sans-serif";
      ctx.fillStyle = darkMode ? "#fff" : "#000";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${sphere.emoji || ""} ${sphere.title[currentLanguage]}`, labelX, labelY);
      ctx.restore();

      // Число среднего значения
      let sum = 0, count = 0;
      sphere.questions.forEach((question) => {
        const slider = document.getElementById(`slider_${sphere.id}_${question.id}`);
        sum += parseInt(slider.value);
        count++;
      });
      const avg = sum / (count || 1);

      const radiusNum = maxRadius * 0.5;
      const xNum = centerX + radiusNum * Math.cos(midAngle);
      const yNum = centerY + radiusNum * Math.sin(midAngle);

      ctx.save();
      ctx.font = "16px sans-serif";
      ctx.fillStyle = darkMode ? "#fff" : "#000";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(Math.round(avg), xNum, yNum);
      ctx.restore();

      startAngle += anglePerSphere;
    });
  }

  // Функция для отрисовки подписей конкретного сектора
  function drawSectorLabels(sector) {
    const canvas = document.getElementById("balanceWheel");
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) / 2 - 30;

    // Подпись у края сектора
    const midAngle = (sector.startAngle + sector.endAngle) / 2;
    const labelRadius = maxRadius - 50;
    const labelX = centerX + labelRadius * Math.cos(midAngle);
    const labelY = centerY + labelRadius * Math.sin(midAngle);
    
    ctx.save();
    ctx.font = "16px sans-serif";
    ctx.fillStyle = darkMode ? "#fff" : "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${sector.sphereObj.emoji || ""} ${sector.sphereObj.title[currentLanguage]}`, labelX, labelY);

    // Число среднего значения
    let sum = 0, count = 0;
    sector.sphereObj.questions.forEach((question) => {
      const slider = document.getElementById(`slider_${sector.sphereObj.id}_${question.id}`);
      sum += parseInt(slider.value);
      count++;
    });
    const avg = sum / (count || 1);

    const radiusNum = maxRadius * 0.5;
    const xNum = centerX + radiusNum * Math.cos(midAngle);
    const yNum = centerY + radiusNum * Math.sin(midAngle);

    ctx.font = "16px sans-serif";
    ctx.fillStyle = darkMode ? "#fff" : "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(Math.round(avg), xNum, yNum);
    ctx.restore();
  };

  // Функция для подсветки сектора
  let activeWheelSector = null; // Глобальная переменная для хранения активного сектора
  let hoveredSector = null; // Глобальная переменная для хранения сектора под курсором

  function highlightSector(sphereId, isHighlighted, isActive = false) {
    const sector = wheelSectors.find(sector => sector.sphereId === sphereId);
    console.log(`Highlighting sector: ${sphereId}, isHighlighted: ${isHighlighted}, isActive: ${isActive}`);

    if (sector) {
        // Очищаем все подсветки, если это не активный сектор
        if (!isActive) {
            drawWheel();
        }

        const canvas = document.getElementById("balanceWheel");
        const ctx = canvas.getContext("2d");
        
        // Сохраняем текущие настройки контекста
        ctx.save();
        
        // Если сектор под курсором или активный, делаем его ярче
        if (isHighlighted || isActive) {
            // Добавляем свечение
            ctx.shadowBlur = isActive ? 20 : 15;
            ctx.shadowColor = sector.sphereObj.color;
            
            // Делаем сектор ярче
            ctx.globalAlpha = isActive ? 0.7 : 0.5;
            ctx.fillStyle = sector.sphereObj.color;
            ctx.beginPath();
            ctx.moveTo(canvas.width/2, canvas.height/2);
            ctx.arc(canvas.width/2, canvas.height/2, sector.radius, sector.startAngle, sector.endAngle);
            ctx.closePath();
            ctx.fill();
            
            // Добавляем выразительную обводку
            ctx.strokeStyle = darkMode ? "#ffffff" : "#000000";
            ctx.lineWidth = isActive ? 3 : 2;
            ctx.globalAlpha = isActive ? 0.8 : 0.6;
            ctx.stroke();

            // Восстанавливаем настройки для отрисовки текста и делений
            ctx.restore();
            ctx.save();
            
            // Увеличиваем контрастность текста и делений
            ctx.globalAlpha = 1.0;
            ctx.lineWidth = isActive ? 2 : 1.5;
            
            // Перерисовываем деления и текст для этого сектора
            drawSectorDivisions(sector);
            drawSectorLabels(sector);
        }
        
        // Восстанавливаем настройки контекста
        ctx.restore();
        
        // Обновляем активный сектор
        if (isActive) {
            // Снимаем предыдущую активацию
            if (activeWheelSector && activeWheelSector !== sphereId) {
                const prevSector = wheelSectors.find(s => s.sphereId === activeWheelSector);
                if (prevSector) {
                    drawWheel();
                }
            }
            activeWheelSector = sphereId;
            hoveredSector = null;
            // Переключаем активную вкладку
            const tab = document.getElementById(`tab-${sphereId}`);
            if (tab) {
                const tabEl = bootstrap.Tab.getOrCreateInstance(tab);
                tabEl.show();
            }
        } else if (isHighlighted) {
            hoveredSector = sphereId;
        }
    } else {
        console.error(`Sector not found for sphereId: ${sphereId}`);
    }
  }

  // Функция для подсветки активного сектора
  function highlightActiveSector(sphereId) {
    console.log(`Highlighting active sector: ${sphereId}`);
    // Устанавливаем новый активный сектор
    activeWheelSector = sphereId;
    // Подсвечиваем активный сектор
    highlightSector(sphereId, true, true);
  }

  // Обработчик события для наведения на сектор
  const canvas = document.getElementById("balanceWheel");
  let highlightTimeout; // Переменная для хранения таймера

  canvas.addEventListener('mousemove', (e) => {
    const hoveredSector = getSectorUnderCursor(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
    if (hoveredSector) {
        console.log(`Mouse over sector: ${hoveredSector.sphereId}`); // Логирование
        clearTimeout(highlightTimeout); // Очистка предыдущего таймера
        // Если сектор не активный, добавляем эффект свечения
        if (hoveredSector.sphereId !== activeWheelSector) {
            highlightSector(hoveredSector.sphereId, true, false);
        }
    }
  });

  // Обработчик события для ухода курсора с canvas
  canvas.addEventListener('mouseleave', () => {
    clearTimeout(highlightTimeout);
    if (activeWheelSector) {
        highlightSector(activeWheelSector, false, true); // Оставляем подсветку только на активном секторе
    } else {
        drawWheel(); // Перерисовываем колесо в исходное состояние
    }
    drawWheel(false); // Добавляем вызов drawWheel()
  });

  // Обработчик события для клика на сектор
  canvas.addEventListener('click', (e) => {
    const hoveredSector = getSectorUnderCursor(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
    if (hoveredSector) {
        console.log(`Clicked on sector: ${hoveredSector.sphereId}`); // Логирование
        const tabButton = document.getElementById("tab-" + hoveredSector.sphereId);
        if (tabButton) {
            tabButton.click(); // Кликаем на вкладку
            showTabContent(hoveredSector.sphereId); // Обновляем контент
        }
        // Устанавливаем новый активный сектор и подсвечиваем его
        activeWheelSector = hoveredSector.sphereId;
        highlightSector(hoveredSector.sphereId, true, true);
    } else {
        console.log(`Clicked outside of sectors`); // Логирование
        if (activeWheelSector) {
            highlightSector(activeWheelSector, false, true); // Восстанавливаем подсветку активного сектора
        }
    }
  });

  // Обработчик изменения слайдера определен выше

  // Функция для подсветки активного сектора
  function highlightActiveSector(sphereId) {
    console.log(`Highlighting active sector: ${sphereId}`);
    // Устанавливаем новый активный сектор
    activeWheelSector = sphereId;
    // Подсвечиваем активный сектор
    highlightSector(sphereId, true, true);
  }

  // Слайдер истории
  function initializeHistorySlider() {
    loadResultsList().then(entries => {
      if (entries.length < 2) {
        document.getElementById("historySliderContainer").classList.add("d-none");
        return;
      }
      const historySliderContainer = document.getElementById("historySliderContainer");
      historySliderContainer.classList.remove("d-none");

      entries.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);

      const historySlider = document.getElementById("historySlider");
      historySlider.min = "0";
      historySlider.max = entries.length - 1;
      historySlider.value = entries.length - 1;

      updateHistoryDateDisplay(historySlider.value, entries);
      updateCanvasFromHistory(entries, historySlider.value);

      historySlider.addEventListener("input", (e) => {
        const value = e.target.value;
        updateHistoryDateDisplay(value, entries);
        updateCanvasFromHistory(entries, value);
      });
    }).catch(error => {
      console.error("Ошибка при загрузке результатов:", error);
      showModal("loadErrorModal", 'loaded');
    });
  }

  function updateHistoryDateDisplay(value, entries) {
    const entry = entries[value];
    const date = new Date(entry.createdAt.seconds * 1000);
    document.getElementById("historyDateDisplay").textContent = date.toLocaleString();
  }

  function updateCanvasFromHistory(entries, index) {
    const data = entries[index].data;
    Object.keys(data).forEach(sphereId => {
      const sphereData = data[sphereId];
      Object.keys(sphereData).forEach(questionId => {
        const slider = document.getElementById(`slider_${sphereId}_${questionId}`);
        if (slider) {
          const value = sphereData[questionId];
          slider.value = value;
          updateSliderDisplay(sphereId, questionId, value);
        }
      });
      updateSphereAverage(sphereId);
    });
    drawWheel();
    if (activeWheelSector) {
      highlightActiveSector(activeWheelSector);
    }
  }
  // ===========================================================================

  // =================== Блок сохранения в JSON/PDF ============================
  function initPdfFonts(doc) {
    doc.addFileToVFS("DejaVuSans.ttf", DejaVuSansTTF);
    doc.addFont("DejaVuSans.ttf", "DejaVuSans", "normal");
    doc.setFont("DejaVuSans", "normal");
  }

  // Обновление даты (отображение в углу)
  function updateDateDisplay() {
    const now = new Date();
    const monthsEn = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const monthsRu = [
      "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
      "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
    ];
    const day = now.getDate();
    const monthIndex = now.getMonth();
    const year = now.getFullYear();

    if (currentLanguage === "ru") {
      const monthName = monthsRu[monthIndex];
      const dateString = `${day} ${monthName} ${year}`;
      document.getElementById("currentDate").innerText = `(${dateString})`;
    } else {
      const monthName = monthsEn[monthIndex];
      const dateString = `${monthName} ${day}, ${year}`;
      document.getElementById("currentDate").innerText = `(${dateString})`;
    }
  }

  // Кнопка «Сохранить результаты в JSON» (если присутствует)
  document.getElementById("saveResults")?.addEventListener("click", () => {
    let results = {};
    results.date = new Date().toISOString();
    spheres.forEach((sphere) => {
      let sphereData = {};
      sphere.questions.forEach((question) => {
        const slider = document.getElementById(`slider_${sphere.id}_${question.id}`);
        sphereData[question.id] = parseInt(slider.value);
      });
      results[sphere.id] = sphereData;
    });
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(results, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "results.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  });

  // Кнопка «Сохранить в PDF»
  document.getElementById("savePDF")?.addEventListener("click", async () => {
    await document.fonts.ready;
    const originalDarkMode = darkMode;
    darkMode = false;
    document.body.classList.remove("dark-mode");

    const canvas = document.getElementById("balanceWheel");
    canvas.width = 800;
    canvas.height = 800;

    drawWheel();

    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    fillCanvasBackground(canvas, "#ffffff");

    setTimeout(() => {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ unit: "px", format: "a4" });
      initPdfFonts(doc);

      const now = new Date();
      const day = now.getDate();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();
      const dateString = `${day}.${month}.${year}`;

      const canvasData = canvas.toDataURL("image/png");

      let yPos = 20;
      const margin = 20;
      const pageHeight = doc.internal.pageSize.height;
      const pageWidth = doc.internal.pageSize.getWidth();
      const maxTextWidth = pageWidth - margin * 2;

      doc.setFontSize(12);
      doc.text(`Mentorist Balance Wheel (${dateString})`, margin, yPos);
      yPos += 20;

      const imageWidth = 200;
      const xPos = (pageWidth - imageWidth) / 2;
      doc.addImage(canvasData, "PNG", xPos, yPos, imageWidth, 200);
      yPos += 220;
      doc.setFontSize(10);

      // Перебираем сферы, выводим оценки и описания
      spheres.forEach((sphere) => {
        let sum = 0, count = 0;
        sphere.questions.forEach((question) => {
          const slider = document.getElementById(`slider_${sphere.id}_${question.id}`);
          sum += parseInt(slider.value);
          count++;
        });
        const avg = (sum / (count || 1)).toFixed(1);
        const sphereLine = `${sphere.title[currentLanguage]} ${avg}`;
        let sphereLines = doc.splitTextToSize(sphereLine, maxTextWidth);

        sphereLines.forEach((line) => {
          if (yPos > pageHeight - margin) {
            doc.addPage();
            yPos = margin;
          }
          doc.text(line, margin, yPos);
          yPos += 15;
        });

        sphere.questions.forEach((question) => {
          const slider = document.getElementById(`slider_${sphere.id}_${question.id}`);
          const value = slider.value;
          const answer = question.descriptions[value]
            ? question.descriptions[value][currentLanguage]
            : "";
          const questionLine = `${question.title[currentLanguage]}: ${answer}`;

          let questionLines = doc.splitTextToSize(questionLine, maxTextWidth);
          questionLines.forEach((line) => {
            if (yPos > pageHeight - margin) {
              doc.addPage();
              yPos = margin;
            }
            doc.text(line, margin + 10, yPos);
            yPos += 15;
          });
        });
        yPos += 10;
      });

      // Общий средний балл
      let total = 0, globalCount = 0;
      spheres.forEach((sphere) => {
        sphere.questions.forEach((question) => {
          const slider = document.getElementById(`slider_${sphere.id}_${question.id}`);
          total += parseInt(slider.value);
          globalCount++;
        });
      });
      const overall = (total / (globalCount || 1)).toFixed(1);
      const overallText = (currentLanguage === "ru" ? "Общее среднее: " : "Overall Average: ") + overall;

      let overallLines = doc.splitTextToSize(overallText, maxTextWidth);
      overallLines.forEach((line) => {
        if (yPos > pageHeight - margin) {
          doc.addPage();
          yPos = margin;
        }
        doc.text(line, margin, yPos);
        yPos += 15;
      });

      doc.save("results.pdf");
    }, 200);

    setTimeout(() => {
      darkMode = originalDarkMode;
      if (darkMode) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
      drawWheel();
    }, 600);
  });
  // ====================== Конец сохранения JSON/PDF ==========================

  // ================== БЛОК С ТАБАМИ ==================
  // Изначальная инициализация
  function setupButtons() {
    const isMobile = window.innerWidth < 576;
    const themeBtn = isMobile ? document.getElementById("themeToggle") : document.getElementById("themeToggleDesktop");
    const langBtn = isMobile ? document.getElementById("langToggle") : document.getElementById("langToggleDesktop");
    const faqContent = document.getElementById("faqContent");
    const sphereTabContent = document.getElementById("sphereTabContent");
    
    // Устанавливаем текст кнопок в соответствии с текущими настройками
    if (themeBtn) {
      themeBtn.innerText = darkMode
        ? (currentLanguage === "ru" ? "🌙 Тёмная" : "🌙 Dark")
        : (currentLanguage === "ru" ? "🌞 Светлая" : "🌞 Light");
    }
    
    if (langBtn) {
      langBtn.innerText = (currentLanguage === "ru") ? "🌐 RU" : "🌐 EN";
    }

    // **По умолчанию показываем FAQ**, а сферы скрываем
    if (faqContent) {
      faqContent.style.display = "block";
      faqContent.innerHTML = faqInstructions[currentLanguage];
    }
    if (sphereTabContent) {
      sphereTabContent.style.display = "none";
    }

    if (!themeBtn || !langBtn) return;

    themeBtn.addEventListener("click", () => {
      darkMode = !darkMode;
      document.body.classList.toggle("dark-mode", darkMode);
      themeBtn.innerText = darkMode
        ? (currentLanguage === "ru" ? "🌙 Тёмная" : "🌙 Dark")
        : (currentLanguage === "ru" ? "🌞 Светлая" : "🌞 Light");
      updateUILanguage();
      updateTabStyles();
      drawWheel();
      if (activeWheelSector) {
        highlightSector(activeWheelSector, true, true);
      }
      
      // Сохраняем настройки темы в localStorage
      saveSettingsToLocalStorage(currentLanguage, darkMode);
    });

    // FAQ-кнопки (десктоп + мобильная)
    const faqBtnDesktop = document.getElementById("faqBtnDesktop");
    const faqBtnMobile = document.getElementById("faqBtnMobile");
    const sphereTabs = document.getElementById("sphereTabs");

    // Массив цветов сфер для случайного выбора цвета тултипа
    const sphereColors = [
      '#f6b95a', // желтый (calling)
      '#fbd462', // более яркий желтый (finance)
      '#d25342', // красный (health)
      '#f05f50', // более яркий красный (relationships)
      '#27a2df', // более яркий синий (growth)
      '#2289bc', // синий (recreation)
      '#45c4a1', // более яркий зеленый (environment)
      '#3fa49a'  // зеленый (contribution)
    ];

    // Общая функция для подсветки элемента с затемнением фона
    function highlightElement(element, tooltipText = null, scrollToElement = false, borderRadius = null) {
  if (!element) {
    console.error('Element not found for highlighting');
    return;
  }
  
  console.log('Highlighting element:', element);
  
  // Очищаем существующие оверлеи и тултипы
  const cleanup = () => {
    const existingOverlays = document.querySelectorAll('[id^="faqOverlay"]');
    const existingTooltips = document.querySelectorAll('[id^="faqTooltip"]');
    
    existingOverlays.forEach(overlay => overlay.remove());
    existingTooltips.forEach(tooltip => tooltip.remove());

    document.querySelectorAll('.pulsing').forEach(el => {
      el.classList.remove('pulsing');
      el.style.position = '';
      el.style.zIndex = '';
    });
  };

  // Очищаем существующие элементы
  cleanup();

  // Сохраняем оригинальные стили
  const originalStyles = {
    position: window.getComputedStyle(element).position,
    zIndex: window.getComputedStyle(element).zIndex || 'auto'
  };

  // Создаем оверлей
  const overlay = document.createElement('div');
  overlay.id = 'faqOverlay-' + Date.now();
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  overlay.style.zIndex = '1000';
  document.body.appendChild(overlay);

  // Устанавливаем стили элемента
  element.style.position = originalStyles.position === 'static' ? 'relative' : originalStyles.position;
  element.style.zIndex = '1001';
  element.classList.add('pulsing');

  if (borderRadius) {
    element.style.borderRadius = borderRadius;
  }

  // Создаем тултип
  if (tooltipText) {
    const tooltip = document.createElement('div');
    tooltip.id = 'faqTooltip-' + Date.now();
    tooltip.textContent = tooltipText;

    const randomColor = sphereColors[Math.floor(Math.random() * sphereColors.length)];
    tooltip.style.cssText = `
      background-color: ${randomColor};
      color: ${document.body.classList.contains('dark-mode') ? '#fff' : '#333'};
      padding: 8px 12px;
      border-radius: 4px;
      position: absolute;
      z-index: 1002;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      pointer-events: none;
      white-space: nowrap;
    `;

    document.body.appendChild(tooltip);

    // Позиционируем тултип
    const elementRect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    tooltip.style.top = `${elementRect.bottom + window.scrollY + 10}px`;
    tooltip.style.left = `${elementRect.left + (elementRect.width - tooltipRect.width) / 2}px`;
  }

  // Прокручиваем к элементу
  if (scrollToElement && window.innerWidth <= 576) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // Очищаем через timeout
  setTimeout(() => {
    cleanup();
    element.style.position = originalStyles.position;
    element.style.zIndex = originalStyles.zIndex;
  }, 2000);
}

    // Обработчик для элементов FAQ
    document.addEventListener('click', (e) => {
      if (!e.target.classList.contains('btn-like')) return;
      
      const tooltipText = currentLanguage === 'ru' ? 'я здесь' : 'I am here';
      let targetElement = null;
      
      if (e.target.classList.contains('faq-health-button')) {
        targetElement = document.getElementById('sphereTabs');
      } else if (e.target.classList.contains('faq-timer-button')) {
        targetElement = document.getElementById('timer-button');
      }
      
      if (targetElement) {
        highlightElement(targetElement, tooltipText, true);
      }
    });

    // Функция, которая показывает FAQ и скрывает сферы
    function handleFaqClick() {
      console.log('FAQ click handler started');
      if (!faqContent || !sphereTabContent) {
        console.error('Required elements not found:', { faqContent: !!faqContent, sphereTabContent: !!sphereTabContent });
        return;
      }
      
      console.log('Toggling content visibility');
      faqContent.style.display = "block";
      sphereTabContent.style.display = "none";
      
      console.log('Highlighting FAQ content with tooltip');
      highlightElement(faqContent, currentLanguage === 'ru' ? 'я здесь' : 'I am here', false, '10px');
      
      // Сбрасываем подсветку активного сектора и перерисовываем колесо
      if (activeWheelSector) {
        console.log('Resetting active wheel sector');
        activeWheelSector = null;
        drawWheel();
      }

      // Снимаем "active" у всех вкладок
      const tabLinks = document.querySelectorAll("#sphereTabs .nav-link");
      tabLinks.forEach(tab => tab.classList.remove("active"));
    }

    // Обработчик для вкладок сфер
    if (sphereTabs) {
      sphereTabs.addEventListener('click', (e) => {
        const target = e.target.closest('.nav-link');
        if (!target) return;

        // Переключаем видимость контента
        if (faqContent) {
          faqContent.style.display = "none";
        }
        if (sphereTabContent) {
          sphereTabContent.style.display = "block";
        }

        // Снимаем "active" у всех вкладок
        const tabLinks = document.querySelectorAll("#sphereTabs .nav-link");
        tabLinks.forEach(tab => tab.classList.remove("active"));
        target.classList.add("active");

        if (window.innerWidth <= 576) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    }

    if (faqBtnDesktop) faqBtnDesktop.addEventListener("click", handleFaqClick);
    if (faqBtnMobile) faqBtnMobile.addEventListener("click", handleFaqClick);

    // Кнопка смены языка
    langBtn.addEventListener("click", () => {
      const faqIsOpen = (faqContent && faqContent.style.display !== "none");

      // Сохраняем значения ползунков
      const savedValues = {};
      spheres.forEach(sphere => {
        sphere.questions.forEach(question => {
          const slider = document.getElementById(`slider_${sphere.id}_${question.id}`);
          if (slider) {
            savedValues[sphere.id] = savedValues[sphere.id] || {};
            savedValues[sphere.id][question.id] = slider.value;
          }
        });
      });

      // Переключаем язык
      currentLanguage = (currentLanguage === "ru") ? "en" : "ru";
      
      // Создаем и диспатчим событие изменения языка для timer.js
      document.dispatchEvent(new CustomEvent('languageChanged', {
        detail: { language: currentLanguage }
      }));

      langBtn.innerText = (currentLanguage === "ru") ? "🌐 RU" : "🌐 EN";
      
      // Сохраняем настройки языка в localStorage
      saveSettingsToLocalStorage(currentLanguage, darkMode);
      themeBtn.innerText = darkMode
        ? (currentLanguage === "ru" ? "🌙 Тёмная" : "🌙 Dark")
        : (currentLanguage === "ru" ? "🌞 Светлая" : "🌞 Light");
      
      if (activeWheelSector) {
        highlightSector(activeWheelSector, true, true);
      }

      const savePdfBtn = document.getElementById("savePDF");
      if (savePdfBtn) {
        // В нашем случае, PDF-кнопка везде одинаковая, можно не менять
        savePdfBtn.innerText = (currentLanguage === "ru") ? "🔽 PDF" : "🔽 PDF";
      }

      updateDateDisplay();
      updateUILanguage();

      renderTabs();
      // Восстанавливаем ползунки
      spheres.forEach(sphere => {
        if (savedValues[sphere.id]) {
          sphere.questions.forEach(question => {
            const slider = document.getElementById(`slider_${sphere.id}_${question.id}`);
            if (slider) {
              slider.value = savedValues[sphere.id][question.id] || 5;
              updateSliderDisplay(sphere.id, question.id, slider.value);
            }
          });
          updateSphereAverage(sphere.id);
        }
      });
      updateTabStyles();
      drawWheel();
      
      // Восстанавливаем подсветку активного сектора после перерисовки колеса
      if (activeWheelSector) {
        highlightSector(activeWheelSector, true, true);
      }

      // Если до переключения языка FAQ был открыт — оставим его открытым
      if (faqIsOpen) {
        if (faqContent) {
          faqContent.innerHTML = faqInstructions[currentLanguage];
          faqContent.style.display = "block";
        }
        if (sphereTabContent) {
          sphereTabContent.style.display = "none";
        }
      } else {
        // Если же FAQ был закрыт, наоборот, скрываем FAQ
        if (faqContent) {
          faqContent.style.display = "none";
        }
        if (sphereTabContent) {
          sphereTabContent.style.display = "block";
        }
      }
    });
  }

  // Инициализация при загрузке
  function init() {
    renderTabs();
    updateDateDisplay();
    drawWheel();
    setupButtons();
    initializeHistorySlider(); // Добавляем инициализацию слайдера истории
  }

  // Инициализация при загрузке
  init();
  
  // Инициализация плавающей подсказки
  initFloatingTooltip();
  
  // Устанавливаем текущий язык для модуля подсказок
  window.currentLanguage = currentLanguage;

  // Если на мобильном листаем вниз — скрываем вкладки, вверх — показываем
  let lastScrollTop = 0;
  window.addEventListener("scroll", function() {
    if (window.innerWidth >= 576) return;
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      document.getElementById("sphereTabs").style.transform = "translateY(-200%)";
    } else {
      document.getElementById("sphereTabs").style.transform = "translateY(0)";
    }
    lastScrollTop = st <= 0 ? 0 : st;
  }, false);

  // 3D-эффект при наведении на колесо
  const canvasWrapper = document.getElementById('canvas-wrapper');
  const wheelContainer = document.getElementById('balanceWheelContainer');
  const glow = wheelContainer.querySelector('.glow');
  let bounds;

  /**
   * Tooltip — НЕ учитываем реальный 3D-поворот,
   * а просто смотрим позицию внутри «неповёрнутого» канваса.
   */
  function showSphereTooltip(e) {
    const canvas = document.getElementById("balanceWheel");
    const tooltip = document.getElementById("canvasTooltip");
    canvas.style.cursor = 'pointer';
    // Координаты мыши внутри канваса с учетом позиции wheelContainer
    const wheelRect = wheelContainer.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    // Используем координаты относительно wheelContainer, а не canvas
    const xInCanvas = e.clientX - wheelRect.left;
    const yInCanvas = e.clientY - wheelRect.top;

    const hoveredSector = getSectorUnderCursor(xInCanvas, yInCanvas);
    if (!hoveredSector) {
      tooltip.style.display = 'none';
      canvas.style.cursor = 'default';
      return;
    }
    const sphere = hoveredSector.sphereObj;
    const sphereTitle = sphere.title[currentLanguage] || sphere.title["en"];

    // Собираем текст для подсказки
    let questionsHtml = '';
    sphere.questions.forEach(question => {
      const sliderId = `slider_${sphere.id}_${question.id}`;
      const sliderEl = document.getElementById(sliderId);
      if (!sliderEl) return;
      const val = sliderEl.value;
      const desc = question.descriptions[val]
        ? question.descriptions[val][currentLanguage]
        : '';
      questionsHtml += `<div style="margin-bottom:2px;">
        <strong>${question.title[currentLanguage]}:</strong> ${desc}
      </div>`;
    });
    const tooltipHtml = `
      <div style="font-weight:600; margin-bottom:6px;">${sphereTitle}</div>
      ${questionsHtml}
    `;
    tooltip.innerHTML = tooltipHtml;
    // Получаем размеры тултипа
    const tooltipRect = tooltip.getBoundingClientRect();
    const tooltipHeight = tooltipRect.height;
    const tooltipWidth = tooltipRect.width;

    // Проверяем доступное пространство
    const bottomSpace = window.innerHeight - e.clientY;
    const rightSpace = window.innerWidth - e.clientX;

    // Позиционируем тултип
    let tooltipLeft = e.pageX + 15;
    let tooltipTop = e.pageY + 15;

    // Если тултип выходит за правую границу
    if (rightSpace < tooltipWidth + 15) {
      tooltipLeft = e.pageX - tooltipWidth - 15;
    }

    // Если тултип выходит за нижнюю границу
    if (bottomSpace < tooltipHeight + 15) {
      tooltipTop = e.pageY - tooltipHeight - 15;
    }

    tooltip.style.left = tooltipLeft + 'px';
    tooltip.style.top = tooltipTop + 'px';
    tooltip.style.display = 'block';
  }

  // Определяем, попал ли угол мыши в сектор
  function isAngleInArc(angle, start, end) {
    if (start <= end) {
        return angle >= start && angle <= end;
    } else {
        // Если дуга "переваливает" через 2π
        return (angle >= start && angle < 2 * Math.PI) || (angle >= 0 && angle <= end);
    }
  }

  // Делаем функцию доступной глобально для модуля floating-tooltip.js
window.getSectorUnderCursor = function(mouseX, mouseY) {
    const canvas = document.getElementById("balanceWheel");
    const canvasRect = canvas.getBoundingClientRect();
    const centerX = canvasRect.width / 2;
    const centerY = canvasRect.height / 2;
    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    const r = Math.sqrt(dx * dx + dy * dy);

    let angle = Math.atan2(dy, dx);
    if (angle < 0) {
        angle += 2 * Math.PI;
    }

    console.log(`Mouse Position: (${mouseX}, ${mouseY}), Angle: ${angle}, Radius: ${r}`); // Логирование

    for (let sector of wheelSectors) {
        let startAngle = sector.startAngle;
        let endAngle = sector.endAngle;
        if (startAngle < 0) startAngle += 2 * Math.PI;
        if (endAngle < 0) endAngle += 2 * Math.PI;

        // Проверяем, попадает ли угол в сектор
        if (isAngleInArc(angle, startAngle, endAngle)) {
            // И проверяем радиус
            if (r <= sector.radius) {
                console.log(`Sector found: ${sector.sphereId}`); // Логирование
                // Подсвечиваем сектор при наведении
                highlightSector(sector.sphereId, true);
                // Добавляем обработчик для снятия подсветки при уходе курсора
                canvas.addEventListener('mouseleave', () => {
                    highlightSector(sector.sphereId, false);
                }, { once: true });
                return sector;
            }
        }
    }
    return null;
}

  /**
   * 3D-поворот колеса — игнорируем его для tooltip,
   * но саму анимацию/наклон оставляем.
   */
  function rotateCanvas(e) {
    // Обработка события deviceorientation для мобильных устройств
    if (e.type === 'deviceorientation') {
      const alpha = e.alpha; // Компас: 0-360
      const beta = e.beta;   // Наклон вперед/назад: -180-180
      const gamma = e.gamma; // Наклон влево/вправо: -90-90

      // Преобразуем данные гироскопа в поворот canvas
      const dx = gamma * 10;
      const dy = beta * 10;
      const distance = Math.sqrt(dx * dx + dy * dy);

      wheelContainer.style.transform = `
        scale3d(1.07, 1.07, 1.07)
        rotate3d(
          ${dy / 100},
          ${-dx / 100},
          0,
          ${Math.log(distance) * 2}deg
        )
      `;
      return;
    }

    // Координаты относительно центра wheelContainer
    const rect = wheelContainer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Поворот
    wheelContainer.style.transform = `
      scale3d(1.07, 1.07, 1.07)
      rotate3d(
        ${dy / 100},
        ${-dx / 100},
        0,
        ${Math.log(distance) * 2}deg
      )
    `;
    // Блик
    const leftX = e.clientX - rect.left;
    const topY = e.clientY - rect.top;
    glow.style.backgroundImage = `
      radial-gradient(
        circle at
        ${leftX}px ${topY}px,
        rgba(255, 255, 255, 0.2),
        transparent 70%
      )
    `;
    // Tooltip (не учитывает реальный 3D-поворот)
    showSphereTooltip(e);
  }

  canvasWrapper.addEventListener('mouseenter', () => {
    bounds = wheelContainer.getBoundingClientRect();
    document.addEventListener('mousemove', rotateCanvas);
  });

  canvasWrapper.addEventListener('mouseleave', () => {
    document.removeEventListener('mousemove', rotateCanvas);
    wheelContainer.style.transform = 'scale3d(1, 1, 1) rotate3d(0, 0, 0, 0deg)';
    glow.style.backgroundImage = 'none';
    const tooltip = document.getElementById('canvasTooltip');
    if (tooltip) {
      tooltip.style.display = 'none';
    }
    drawWheel(false); // Добавляем вызов drawWheel()
    if (activeWheelSector) {
        highlightSector(activeWheelSector, false, true); // Оставляем подсветку только на активном секторе
    }
  });

  window.addEventListener('deviceorientation', function(event) {
    const alpha = event.alpha; // Rotation around z-axis
    const beta = event.beta; // Rotation around x-axis
    const gamma = event.gamma; // Rotation around y-axis

    // Calculate rotation based on device orientation
    const rotateX = beta / 90; // Normalize to [-1, 1]
    const rotateY = gamma / 90; // Normalize to [-1, 1]

    // Apply rotation to the canvas
    wheelContainer.style.transform = `
      scale3d(1.07, 1.07, 1.07)
      rotate3d(
        ${rotateX},
        ${-rotateY},
        0,
        ${Math.log(Math.abs(rotateX) + Math.abs(rotateY) + 1) * 2}deg
      )
    `;

    // Получаем размеры контейнера
    const rect = wheelContainer.getBoundingClientRect();
    
    // Adjust glow effect based on orientation
    const leftX = (rotateY + 1) * rect.width / 2;
    const topY = (rotateX + 1) * rect.height / 2;
    glow.style.backgroundImage = `
      radial-gradient(
        circle at
        ${leftX}px ${topY}px,
        rgba(255, 255, 255, 0.2),
        transparent 70%
      )
    `;
  });

  showEmojiExplosion();
});
// Конец DOMContentLoaded
