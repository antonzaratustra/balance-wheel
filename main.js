// Глобальный объект с инструкциями FAQ
const faqInstructions = {
  ru: `<strong>Добро пожаловать в Mentorist Life Balance Wheel!</strong><br><br>
  Это инструмент для оценки баланса жизни по 8 ключевым сферам: Здоровье, Отношения, Окружение, Призвание, Финансы, Саморазвитие, Яркость жизни и Духовность.<br><br>
  <strong>1. Тема и язык:</strong> Используйте кнопки для смены темы и языка <span class="btn-like">🌐 RU</span> и <span class="btn-like">🌙 Тёмная</span> / <span class="btn-like">🌞 Светлая</span>.<br><br>
  <strong>2. FAQ:</strong> Нажмите <span class="btn-like">💡 FAQ</span> для этой инструкции; для возврата к сферам – нажмите вкладку сферы, например <span class="btn-like">❤️ Здоровье (5.0)</span>.<br><br>
  <strong>3. Переключение:</strong> Вкладки вверху позволяют переключаться между сферами жизни.<br><br>
  <strong>4. Оценка:</strong> В каждой сфере есть 5 вопросов. Используйте слайдеры для оценки от 0 до 10.<br><br>
  <strong>5. Визуализация:</strong> Колесо баланса наглядно показывает ваши оценки.<br><br>
  <strong>6. Среднее:</strong> Для каждой сферы и общее среднее значение рассчитываются автоматически.<br><br>
  <strong>7. Сохранение:</strong> Для сохранения результатов нажмите <span class="btn-like">👤 Login</span>, чтобы войти. После этого используйте кнопку <span class="btn-like">💾</span> для сохранения в облако или <span class="btn-like">☁️</span> для просмотра сохранённых результатов. Кнопка <span class="btn-like">🔽 PDF</span> позволяет скачать результаты в формате PDF.<br><br>
  <strong>8. История:</strong> После входа в систему вы можете использовать слайдер истории для просмотра предыдущих результатов. Слайдер находится под колесом баланса и позволяет перемещаться между сохранёнными датами. При выборе даты колесо обновляется с оценками на эту дату.`,
    
  en: `<strong>Welcome to Mentorist Life Balance Wheel!</strong><br><br>
  This is a tool for assessing life balance across 8 key areas: Health, Relationships, Environment, Calling, Finance, Self-Improvement, Life Brightness, and Spirituality.<br><br>
  <strong>1. Theme and Language:</strong> Use the buttons to switch theme and language <span class="btn-like">🌐 EN</span> and <span class="btn-like">🌙 Dark</span> / <span class="btn-like">🌞 Light</span>.<br><br>
  <strong>2. FAQ:</strong> Click <span class="btn-like">💡 FAQ</span> for this instruction; to return to spheres - click the sphere tab, e.g., <span class="btn-like">❤️ Health (5.0)</span>.<br><br>
  <strong>3. Switching:</strong> Tabs at the top allow you to switch between life areas.<br><br>
  <strong>4. Assessment:</strong> Each area has 5 questions. Use sliders to rate from 0 to 10.<br><br>
  <strong>5. Visualization:</strong> The balance wheel visually displays your ratings.<br><br>
  <strong>6. Average:</strong> Average values for each area and overall are calculated automatically.<br><br>
  <strong>7. Saving:</strong> To save results, click <span class="btn-like">👤 Login</span> to log in. Then use the <span class="btn-like">💾</span> button to save to the cloud or <span class="btn-like">☁️</span> to view saved results. The <span class="btn-like">🔽 PDF</span> button allows you to download results as PDF.<br><br>
  <strong>8. History:</strong> After logging in, you can use the history slider to view previous results. The slider is located below the balance wheel and allows you to navigate between saved dates. When you select a date, the wheel updates with ratings from that date.`
};

// Импорт auth из firebase-init.js
import { auth } from "./firebase-init.js";
import { DejaVuSansTTF } from './fonts.js';
import { spheres } from './js/spheres.js';

// Импорт нужных методов из firebase/auth
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

import {
  saveResultToFirestore,
  loadResultsList,
  loadSavedResult,
  deleteSavedResult
} from "./firestore-utils.js";

document.addEventListener("DOMContentLoaded", () => {
  // Добавляем обработчик поворота устройства
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', rotateCanvas);
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
  let currentLanguage = "en"; 
  let darkMode = true;       
  let wheelSectors = []; // Глобальный массив для хранения геометрии секторов колеса

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

  // ================== БЛОК С МОДАЛЬНЫМ ОКНАМИ ==================
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

  // // Универсальная функция входа через Google
  // async function signInWithGoogle() {
  //   const provider = new GoogleAuthProvider();
  //   const result = await signInWithPopup(auth, provider);
  //   return result.user;
  // }

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
      })
      .catch((err) => {
        console.error("Ошибка при выходе:", err);
        // Можете показать окно ошибки, если хотите
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
          });
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

    // Локализация самой модалки логина
    const loginModalLabel = document.getElementById("loginModalLabel");
    const modalBodyText = document.querySelector("#loginModal .modal-body p");
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
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Пользователь авторизован:", user.uid);
      // Инициализируем слайдер истории (если есть >1 результат)
      initializeHistorySlider();
    } else {
      console.log("Пользователь не авторизован");
      // Скрываем слайдер истории
      const historySliderContainer = document.getElementById("historySliderContainer");
      if (historySliderContainer) {
        historySliderContainer.classList.add("d-none");
      }
    }
    // При любом изменении (логин/логаут) — обновляем кнопки и имя
    updateUILanguage();
  });
  // ===========================================================================


  // ======================== РАБОТА С ТАБАМИ/КОЛЕСОМ ==========================
  /**
   * Создание вкладок сфер (и их контента) динамически
   */
  function renderTabs() {
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

    // Подключаем обработчики на вкладки, чтобы при клике скрывать FAQ и показывать сферы
    const tabLinks = document.querySelectorAll("#sphereTabs .nav-link");
    tabLinks.forEach(tab => {
      tab.addEventListener('click', () => {
        const sphereId = tab.id.split('-')[1]; // Получаем ID сферы
        console.log(`Tab clicked: ${sphereId}`); // Логирование
        showTabContent(sphereId); // Показываем контент соответствующей сферы
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
    const descElem = document.getElementById(`desc_${sphereId}_${questionId}`);
    const dict = question.descriptions[value];
    descElem.innerText = dict ? dict[currentLanguage] : "";

    let val = parseInt(value, 10);
    let fraction = val / 10;
    let r = Math.round(255 * (1 - fraction));
    let g = Math.round(255 * fraction);
    descElem.style.color = `rgb(${r}, ${g}, 0)`;
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

  function drawWheel() {
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

    // Убедитесь, что контейнер для секторов существует
    const sectorsContainer = document.getElementById('sectorsContainer');
    if (!sectorsContainer) {
        console.error("Container for sectors not found!");
        return;
    }

    // Очищаем контейнер перед отрисовкой
    sectorsContainer.innerHTML = '';

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
        ctx.fill();
        ctx.strokeStyle = darkMode ? "#ccc" : "#666";
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
        sectorElement.id = "sector-" + sphere.id; // Убедитесь, что идентификатор соответствует
        sectorElement.className = "sector"; // Добавьте нужные классы
        sectorsContainer.appendChild(sectorElement); // Добавьте элемент в контейнер

        // Подпись у края сектора
        const midAngle = startAngle + anglePerSphere / 2;
        const labelRadius = maxRadius * 0.7;
        const labelX = centerX + labelRadius * Math.cos(midAngle);
        const labelY = centerY + labelRadius * Math.sin(midAngle);
        
        ctx.font = "16px sans-serif"; // Увеличиваем размер шрифта
        ctx.fillStyle = darkMode ? "#fff" : "#000";
        ctx.fillText(`${sphere.emoji || ""} ${sphere.title[currentLanguage]}`, labelX, labelY); // Добавляем эмодзи

        startAngle = endAngle;
    });
  }

  // Функция для отображения контента вкладки
  function showTabContent(sphereId) {
    console.log(`Showing content for sphere: ${sphereId}`); // Логирование
    const tabContent = document.getElementById("sphereTabContent");
    const activePane = document.querySelector(`#pane-${sphereId}`);
    
    // Скрываем все панели
    const allPanes = document.querySelectorAll(".tab-pane");
    allPanes.forEach(pane => {
        pane.classList.remove("show", "active");
    });

    // Показываем активную панель
    if (activePane) {
        activePane.classList.add("show", "active");
        tabContent.style.display = "block"; // Показываем содержимое вкладок
        faqContent.style.display = "none"; // Скрываем FAQ
        console.log(`Active pane shown: ${activePane.id}`); // Логирование
        
        // Подсвечиваем сектор при клике на вкладку
        const sector = wheelSectors.find(s => s.sphereId === sphereId);
        if (sector) {
            highlightSector(sphereId, true);
            // Убираем подсветку через небольшую задержку
            setTimeout(() => {
                highlightSector(sphereId, false);
            }, 500);
        }
    } else {
        console.error(`No active pane found for sphere: ${sphereId}`); // Логирование ошибки
    }
  }

  // Функция для подсветки сектора
  let activeWheelSector = null; // Глобальная переменная для хранения активного сектора

  function highlightSector(sphereId, isHighlighted, isActive = false) {
    const sector = wheelSectors.find(sector => sector.sphereId === sphereId);
    console.log(`Highlighting sector: ${sphereId}, isHighlighted: ${isHighlighted}, isActive: ${isActive}`);

    if (sector) {
        const canvas = document.getElementById("balanceWheel");
        const ctx = canvas.getContext("2d");
        
        // Очищаем весь canvas перед отрисовкой
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Перерисовываем все сектора
        wheelSectors.forEach(s => {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            ctx.arc(canvas.width / 2, canvas.height / 2, s.radius, s.startAngle, s.endAngle);
            ctx.closePath();
            
            // Определяем состояния сектора
            const isCurrentActive = s.sphereId === activeWheelSector;
            const isCurrentHighlighted = s.sphereId === sphereId && (isHighlighted || isActive);
            const isHovered = s.sphereId === sphereId && isHighlighted;
            
            // Настраиваем стили в зависимости от состояния
            ctx.fillStyle = s.sphereObj.color || "#CCC";
            
            if (isCurrentActive || isCurrentHighlighted) {
                ctx.shadowColor = s.sphereObj.color || "#CCC";
                ctx.shadowBlur = 20;
                ctx.globalAlpha = 1.0;
                
                // Делаем активный сектор более насыщенным
                if (isCurrentActive) {
                    const color = s.sphereObj.color || "#CCC";
                    ctx.fillStyle = color;
                    ctx.shadowBlur = 25;
                }
                
                // Если сектор и активный, и под курсором
                if (isCurrentActive && isHovered) {
                    ctx.shadowBlur = 30;
                }
            } else {
                // Неактивные сектора
                ctx.shadowBlur = 0;
                ctx.globalAlpha = 0.95;
                
                // Если курсор над неактивным сектором
                if (isHovered) {
                    ctx.globalAlpha = 1.0;
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = s.sphereObj.color || "#CCC";
                }
            }
            
            ctx.fill();
            ctx.strokeStyle = darkMode ? "#ccc" : "#666";
            ctx.stroke();
            ctx.restore();
            
            // Всегда отображаем текст с полной непрозрачностью
            if (s.text) {
                ctx.save();
                ctx.globalAlpha = 1.0;
                drawSectorText(s);
                ctx.restore();
            }
        });
        
        // Обновляем активный сектор
        if (isActive) {
            activeWheelSector = sphereId;
        }
    } else {
        console.error(`Sector not found for sphereId: ${sphereId}`);
    }
  }

  // Обработчик события для наведения на сектор
  const canvas = document.getElementById("balanceWheel");
  let highlightTimeout; // Переменная для хранения таймера

  canvas.addEventListener('mousemove', (e) => {
    const hoveredSector = getSectorUnderCursor(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
    if (hoveredSector) {
        console.log(`Mouse over sector: ${hoveredSector.sphereId}`); // Логирование
        clearTimeout(highlightTimeout); // Очистка предыдущего таймера
        highlightSector(hoveredSector.sphereId, true, hoveredSector.sphereId === activeWheelSector); // Добавляем эффект свечения
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
        highlightSector(hoveredSector.sphereId, false, true); // Устанавливаем сектор как активный
    } else {
        console.log(`Clicked outside of sectors`); // Логирование
        if (activeWheelSector) {
            highlightSector(activeWheelSector, false, true); // Восстанавливаем подсветку активного сектора
        }
    }
  });

  // Обновляем обработчик изменения слайдера
  function updateSliderDisplay(sphereId, questionId, value) {
    const displayElement = document.getElementById(`value_${sphereId}_${questionId}`);
    if (displayElement) {
        displayElement.textContent = value;
        updateSphereAverage(sphereId);
        drawWheel();
        if (activeWheelSector) {
            highlightSector(activeWheelSector, false, true); // Сохраняем подсветку активного сектора
        }
    }
  }

  // Функция для подсветки активного сектора
  function highlightActiveSector(sphereId) {
    console.log(`Highlighting active sector: ${sphereId}`); // Логирование
    wheelSectors.forEach(sector => {
        const isActive = sector.sphereId === sphereId;
        highlightSector(sector.sphereId, isActive);
    });
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

  // Изначальная инициализация
  function setupButtons() {
    const isMobile = window.innerWidth < 576;
    const themeBtn = isMobile ? document.getElementById("themeToggle") : document.getElementById("themeToggleDesktop");
    const langBtn = isMobile ? document.getElementById("langToggle") : document.getElementById("langToggleDesktop");
    const faqContent = document.getElementById("faqContent");
    const sphereTabContent = document.getElementById("sphereTabContent");

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
    });

    // FAQ-кнопки (десктоп + мобильная)
    const faqBtnDesktop = document.getElementById("faqBtnDesktop");
    const faqBtnMobile = document.getElementById("faqBtnMobile");

    // Функция, которая показывает FAQ и скрывает сферы
    function handleFaqClick() {
      faqContent.classList.remove('faq-content2');
      faqContent.classList.add('faq-content2');
      
      if (!faqContent || !sphereTabContent) return;
      faqContent.innerHTML = faqInstructions[currentLanguage];
      sphereTabContent.style.display = "none"; // Скрываем содержимое вкладок
      faqContent.style.display = "block"; // Показываем FAQ

      // Снимаем "active" у всех вкладок, прячем pane
      const tabLinks = document.querySelectorAll("#sphereTabs .nav-link");
      tabLinks.forEach(tab => {
        tab.classList.remove("active");
        tab.style.boxShadow = 'none';
        const targetPane = document.querySelector(tab.getAttribute("data-bs-target"));
        if (targetPane) {
          targetPane.classList.remove("show", "active");
        }
      });

      if (window.innerWidth <= 576) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
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

      langBtn.innerText = (currentLanguage === "ru") ? "🌐 RU" : "🌐 EN";
      themeBtn.innerText = darkMode
        ? (currentLanguage === "ru" ? "🌙 Тёмная" : "🌙 Dark")
        : (currentLanguage === "ru" ? "🌞 Светлая" : "🌞 Light");

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
  }

  // Инициализация при загрузке
  init();

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
    // Координаты мыши внутри канваса с учетом позиции wheelContainer
    const wheelRect = wheelContainer.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    // Используем координаты относительно wheelContainer, а не canvas
    const xInCanvas = e.clientX - wheelRect.left;
    const yInCanvas = e.clientY - wheelRect.top;

    const hoveredSector = getSectorUnderCursor(xInCanvas, yInCanvas);
    if (!hoveredSector) {
      tooltip.style.display = 'none';
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
    tooltip.style.left = (e.pageX + 15) + 'px';
    tooltip.style.top  = (e.pageY + 15) + 'px';
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

  function getSectorUnderCursor(mouseX, mouseY) {
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
});
// Конец DOMContentLoaded
