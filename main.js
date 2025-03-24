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
  // Удаляем загрузчик
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
  let currentLanguage = "en"; // по умолчанию английский
  let darkMode = true;        // по умолчанию тёмная тема

  // Глобальный массив для хранения геометрии секторов
  let wheelSectors = [];

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

  // Кнопка Google внутри модалки
  const googleSignInBtn = document.getElementById("googleSignInBtn");

  // Отображение имени пользователя
  const userInfo = document.getElementById("userInfo"); 
  const userInfoMobile = document.getElementById("userInfo-mobile"); 

  // Универсальная функция входа через Google (чтобы можно было вызвать из разных мест)
  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  }

  // Обработчик нажатия «Войти через Google» (кнопка в модалке)
  if (googleSignInBtn) {
    googleSignInBtn.addEventListener("click", async () => {
      try {
        const user = await signInWithGoogle();
        if (user) {
          // Закрываем модалку после успешного входа
          const loginModal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
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
        showModal("logoutErrorModal", 'loginRequired');
      });
  }

  // Единая функция-обработчик клика по кнопке Login/Logout (десктоп и мобильная)
  function handleLoginClick() {
    if (auth.currentUser) {
      // Уже залогинен – выходим
      handleSignOut();
    } else {
      // Не залогинен – показываем модалку
      const loginModal = new bootstrap.Modal(loginModalEl, {
        backdrop: true,
        keyboard: true
      });
      loginModal.show();
    }
  }

  // Навешиваем на обе кнопки
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

  // Обработчик десктопной кнопки «сохранить»
  if (saveToCloudBtn) {
    saveToCloudBtn.addEventListener('click', () => {
      if (!auth.currentUser) {
        showModal("authModal", 'loginRequired');
        return;
      }
      saveResult();
    });
  }

  // Обработчики мобильных кнопок (save/view)
  mobileSaveBtn.addEventListener('click', () => {
    if (!auth.currentUser) {
      showModal("authModal", 'loginRequired');
      return;
    }
    saveResult();
  });

  mobileViewBtn.addEventListener('click', async () => {
    if (!auth.currentUser) {
      showModal("authModal", 'loginRequired');
      return;
    }
    // Показываем модалку результатов
    showResultsModal();
  });

  // Десктопная кнопка «показать результаты»
  showResultsBtn.addEventListener("click", async () => {
    if (!auth.currentUser) {
      showModal("authModal", 'loginRequired');
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
        noResultsText.textContent = currentLanguage === "ru" 
          ? "Пока нет сохранённых результатов" 
          : "No saved results yet";

        noResultsDiv.appendChild(travoltaImg);
        noResultsDiv.appendChild(noResultsText);
        resultsListEl.appendChild(noResultsDiv);
      } else {
        entries.forEach((entry) => {
          const row = document.createElement("div");
          row.classList.add("d-flex", "justify-content-between", "align-items-center", "mb-2");

          const titleSpan = document.createElement("span");
          titleSpan.style.flexGrow = "1";
          titleSpan.style.marginRight = "1rem";
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
            const modal = bootstrap.Modal.getInstance(resultsModalEl);
            if (modal) {
              modal.hide();
            }
            showModal("loadSuccessModal", 'loaded');
          });

          delBtn.addEventListener("click", async () => {
            showConfirmDeleteModal(async () => {
              try {
                await deleteSavedResult(entry.id);
                const modal = bootstrap.Modal.getInstance(resultsModalEl);
                if (modal) {
                  modal.hide();
                }
                showResultsModal(); // перегружаем список
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

      // Обновляем заголовок модалки «Мои результаты»
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


  // ==================  ФУНКЦИИ ОБНОВЛЕНИЯ ТЕКСТА КНОПОК  ====================
  /**
   * Меняет текст кнопок Login/Logout (десктоп+моб.) в зависимости от:
   *   - текущего языка (currentLanguage)
   *   - auth.currentUser (залогинен или нет)
   */
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

  /**
   * Меняет текст кнопок «Сохранить» и «Просмотреть результаты» (десктоп+моб.)
   * в зависимости от currentLanguage.
   */
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

  // Функция для обновления имени/емейла пользователя в шапке
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

  /**
   * updateUILanguage() — обновляет весь UI под выбранный язык:
   *   - кнопки логина/логаута
   *   - кнопки сохранения/просмотра
   *   - модалки, заголовки, прочее
   */
  function updateUILanguage() {
    // 1. Обновляем текст кнопок (Login/Logout + Save/View)
    updateLoginButtons();
    updateSaveButtons();

    // 2. Обновляем userInfo
    updateUserInfo();

    // 3. Обновляем текст модалки логина
    const loginModalLabel = document.getElementById("loginModalLabel");
    const modalBodyText = document.querySelector("#loginModal .modal-body p");
    if (currentLanguage === "ru") {
      if (loginModalLabel) loginModalLabel.innerText = "Вход";
      if (modalBodyText) modalBodyText.innerText = "Войдите с помощью:";
    } else {
      if (loginModalLabel) loginModalLabel.innerText = "Login";
      if (modalBodyText) modalBodyText.innerText = "Sign in with:";
    }
    // 4. И т.д. — при необходимости
  }
  // ===========================================================================


  // ======================== onAuthStateChanged ================================
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Пользователь авторизован:", user.uid);
      // Инициализируем слайдер истории после авторизации
      initializeHistorySlider();
    } else {
      console.log("Пользователь не авторизован");
      // Если пользователь вышел — скрыть слайдер
      const historySliderContainer = document.getElementById("historySliderContainer");
      if (historySliderContainer) {
        historySliderContainer.classList.add("d-none");
      }
    }
    // При любом изменении состояния — обновляем кнопки и имя пользователя
    updateUILanguage(); // внутри неё вызываются updateLoginButtons(), updateUserInfo() и т.д.
  });
  // ===========================================================================


  // ======================== РАБОТА С ТАБАМИ/КОЛЕСОМ ==========================
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

    // Сохраняем ID активной вкладки
    const activeTabId = document.querySelector("#sphereTabs .nav-link.active")?.id;

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
      let isMobileView = window.innerWidth < 576;
      if (isMobileView) {
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
    } else {
      // Если активной вкладки нет, показываем FAQ
      const faqTab = document.getElementById("faqBtnDesktop") || document.getElementById("faqBtnMobile");
      if (faqTab) {
        faqTab.click();
      }
    }

    const tabLinks = document.querySelectorAll("#sphereTabs .nav-link");
    tabLinks.forEach(tab => {
      tab.addEventListener("shown.bs.tab", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        updateTabStyles();
      });
      tab.addEventListener("hidden.bs.tab", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        updateTabStyles();
      });
      tab.addEventListener('mouseenter', () => {
        tab.style.boxShadow = `0 0 7px 2.5px ${tab.getAttribute("data-color")}`;
      });
      tab.addEventListener('mouseleave', () => {
        tab.style.boxShadow = 'none';
      });
      tab.addEventListener('click', () => {
        tab.style.boxShadow = `0 0 10px 5px ${tab.getAttribute("data-color")}`;
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
    const isMobile = window.innerWidth < 576;

    if (isMobile) {
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

    const shifts = {
      leftShift:   { x: 45,  y: 0 },
      rightShift:  { x: -60, y: 0 },
      topShift:    { x: 0,   y: -10 },
      bottomShift: { x: 0,   y: 10 }
    };
    const threshold = 0.2;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "18px sans-serif";

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

      wheelSectors.push({
        sphereId: sphere.id,
        startAngle: startAngle,
        endAngle: endAngle,
        radius: sectorRadius,
        sphereObj: sphere
      });

      const midAngle = startAngle + anglePerSphere / 2;
      const cosMid = Math.cos(midAngle);
      const sinMid = Math.sin(midAngle);
      const labelRadius = maxRadius + 10;
      let labelX = centerX + labelRadius * cosMid;
      let labelY = centerY + labelRadius * sinMid;

      const sphereTitle = sphere.title[currentLanguage] || sphere.title["en"];
      let text = "";
      let shift = { x: 0, y: 0 };

      if (sphere.id === "selfImprovement" || sphere.id === "lifeBrightness") {
        shift.x = 10;
      }

      if (sphere.id === "health") {
        text = `${sphereTitle} ${avg.toFixed(1)} ${sphere.emoji || ""}`;
      } else {
        if (cosMid > threshold) {
          shift = shifts.rightShift;
          text = `${sphereTitle} ${avg.toFixed(1)} ${sphere.emoji || ""}`;
        } else if (cosMid < -threshold) {
          shift = shifts.leftShift;
          text = `${sphere.emoji || ""} ${sphereTitle} ${avg.toFixed(1)}`;
        } else {
          if (sinMid > 0) {
            shift = shifts.topShift;
            text = `${sphere.emoji || ""} ${sphereTitle} ${avg.toFixed(1)}`;
          } else {
            shift = shifts.bottomShift;
            text = `${sphere.emoji || ""} ${sphereTitle} ${avg.toFixed(1)}`;
          }
        }
      }
      labelX += shift.x;
      labelY += shift.y;

      ctx.shadowColor = darkMode ? "#000" : "#fff";
      ctx.shadowBlur = 2;
      ctx.fillStyle = darkMode ? "#fff" : "#000";
      ctx.fillText(text, labelX, labelY);
      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + maxRadius * Math.cos(startAngle),
                 centerY + maxRadius * Math.sin(startAngle));
      ctx.stroke();

      startAngle = endAngle;
    });

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + maxRadius * Math.cos(startAngle),
               centerY + maxRadius * Math.sin(startAngle));
    ctx.stroke();
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
          const answer = question.descriptions[value] ? question.descriptions[value][currentLanguage] : "";
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
    const faqContent = document.getElementById("faqContent");
    const sphereTabContent = document.getElementById("sphereTabContent");

    if (faqContent) {
      faqContent.style.display = "block";
      faqContent.innerHTML = faqInstructions[currentLanguage];
    }
    if (sphereTabContent) {
      sphereTabContent.style.display = "block";
    }

    const themeBtn = document.getElementById("themeToggle");
    const langBtn = document.getElementById("langToggle");

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

    // FAQ-кнопки
    const faqBtnDesktop = document.getElementById("faqBtnDesktop");
    const faqBtnMobile = document.getElementById("faqBtnMobile");

    function handleFaqClick() {
      if (!faqContent || !sphereTabContent) return;
      faqContent.innerHTML = faqInstructions[currentLanguage];
      sphereTabContent.style.display = "none";
      faqContent.style.display = "block";

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

    langBtn.addEventListener("click", () => {
      const faqContent = document.getElementById("faqContent");
      const faqIsOpen = faqContent.style.display !== "none";

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
        savePdfBtn.innerText = (currentLanguage === "ru") ? "🔽 PDF" : "🔽 PDF";
      }

      updateDateDisplay();
      updateUILanguage();

      renderTabs();
      spheres.forEach(sphere => {
        if (savedValues[sphere.id]) {
          sphere.questions.forEach(question => {
            const slider = document.getElementById(`slider_${sphere.id}_${question.id}`);
            if (slider && savedValues[sphere.id][question.id]) {
              slider.value = savedValues[sphere.id][question.id];
              updateSliderDisplay(sphere.id, question.id, slider.value);
            }
          });
          updateSphereAverage(sphere.id);
        }
      });
      updateTabStyles();
      drawWheel();

      if (faqIsOpen) {
        faqContent.innerHTML = faqInstructions[currentLanguage];
      }
      const sphereTabs = document.querySelectorAll("#sphereTabs .nav-link");
      sphereTabs.forEach(tab => {
        tab.addEventListener("click", () => {
          faqContent.style.display = "none";
          document.getElementById("sphereTabContent").style.display = "block";
        });
      });
    });
  }

  // Инициализация при загрузке
  renderTabs();
  updateDateDisplay();
  drawWheel();
  setupButtons();

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

  function showSphereTooltip(e) {
    const canvas = document.getElementById("balanceWheel");
    const tooltip = document.getElementById("canvasTooltip");
    const rect = canvas.getBoundingClientRect();
    const xInCanvas = e.clientX - rect.left;
    const yInCanvas = e.clientY - rect.top;

    const hoveredSector = getSectorUnderCursor(xInCanvas, yInCanvas);
    if (!hoveredSector) {
      tooltip.style.display = 'none';
      return;
    }
    const sphere = hoveredSector.sphereObj;
    const sphereTitle = sphere.title[currentLanguage] || sphere.title["en"];
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

  function isAngleInArc(angle, start, end) {
    if (start <= end) {
      return angle >= start && angle <= end;
    } else {
      return (angle >= start && angle < 2 * Math.PI) || (angle >= 0 && angle <= end);
    }
  }

  function getSectorUnderCursor(mouseX, mouseY) {
    const canvas = document.getElementById("balanceWheel");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    const r = Math.sqrt(dx * dx + dy * dy);
    let angle = Math.atan2(dy, dx);
    if (angle < 0) {
      angle += 2 * Math.PI;
    }
    for (let sector of wheelSectors) {
      let startAngle = sector.startAngle;
      let endAngle = sector.endAngle;
      if (startAngle < 0) startAngle += 2 * Math.PI;
      if (endAngle < 0) endAngle += 2 * Math.PI;
      if (isAngleInArc(angle, startAngle, endAngle)) {
        if (r <= sector.radius) {
          return sector;
        }
      }
    }
    return null;
  }

  function rotateCanvas(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;
    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2
    };
    const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

    wheelContainer.style.transform = `
      scale3d(1.07, 1.07, 1.07)
      rotate3d(
        ${center.y / 100},
        ${-center.x / 100},
        0,
        ${Math.log(distance) * 2}deg
      )
    `;
    glow.style.backgroundImage = `
      radial-gradient(
        circle at
        ${leftX}px ${topY}px,
        rgba(255, 255, 255, 0.2),
        transparent 70%
      )
    `;
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
});
// Конец DOMContentLoaded
