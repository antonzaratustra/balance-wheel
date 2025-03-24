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
  <strong>8. History:</strong> After logging in, you can use the history slider to view previous results. The slider is located below the balance wheel and allows you to navigate between saved dates. When you select a date, the wheel updates with ratings from that date.`,
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
    
    // Добавляем класс loading для инициального состояния
    colMd7.classList.add('loading');
    canvasWrapper.classList.add('loading');
    faqContent.classList.add('loading');
    
    // Удаляем класс loading через небольшой таймаут для запуска анимации
    setTimeout(() => {
      colMd7.classList.remove('loading');
      canvasWrapper.classList.remove('loading');
      faqContent.classList.remove('loading');
    }, 50); // 50ms для инициализации стилей
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
  // Устанавливаем режим, чтобы нарисованный фон оказался позади уже существующего содержимого
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





































const saveToCloudBtn = document.getElementById("saveToCloudBtn");

// Функция для отображения модального окна
const modalTranslations = {
  ru: {
    savedToCloud: "Результат успешно сохранён в облако!",
    loaded: "Результат успешно загружен!",
    deleteConfirm: "Точно удалить результат?",
    deleted: "Результат удален!",
    loginRequired: "Сначала войдите в систему!",
    myResults: "Мои результаты",
    success: "Успех",
    delete: "Удалить",
    noResults: "Пока нет сохранённых результатов",
    load: "Загрузить",
    cancel: "Отмена"
  },
  en: {
    savedToCloud: "Result successfully saved to the cloud!",
    loaded: "Result successfully loaded!",
    deleteConfirm: "Are you sure you want to delete the result?",
    deleted: "Result deleted!",
    loginRequired: "Please log in first!",
    myResults: "My Results",
    success: "Success",
    delete: "Delete",
    noResults: "No saved results yet",
    load: "Load",
    cancel: "Cancel"
  }
};

function showModal(modalId, messageKey = null) {
  const modal = document.getElementById(modalId);
  if (modal && messageKey) {
    const modalTitle = modal.querySelector('.modal-title');
    const modalBody = modal.querySelector('.modal-body');
    
    // Получаем переводы для текущего языка
    const translations = modalTranslations[currentLanguage];
    
    // Обновляем заголовок и текст модального окна
    if (modalTitle) {
      modalTitle.textContent = translations[messageKey] || translations.success;
    }
    if (modalBody) {
      modalBody.textContent = translations[messageKey] || translations.success;
    }
  }
  if (modal) {
    new bootstrap.Modal(modal).show();
  }
}

// Функция для сохранения результата
async function saveResult() {
  try {
    await saveResultToFirestore(new Date().toLocaleString(), spheres);
    showModal('saveSuccessModal', 'savedToCloud');
    // Обновляем слайдер истории после сохранения
    initializeHistorySlider();
  } catch (error) {
    console.error('Ошибка при сохранении:', error);
    // Здесь можно добавить обработку ошибки
  }
}

// Добавляем обработчик для кнопки сохранения
if (saveToCloudBtn) {
  saveToCloudBtn.addEventListener('click', () => {
    if (!auth.currentUser) {
      showModal("authModal", 'loginRequired');
      return;
    }
    saveResult();
  });
}

// Добавляем функциональность для мобильных кнопок
const mobileSaveBtn = document.getElementById('mobile-save-btn');
const mobileLoginBtn = document.getElementById('mobile-login-btn');
const mobileViewBtn = document.getElementById('mobile-view-btn');

// Объект для текстов кнопок
const buttonTexts = {
  ru: {
    save: '💾 Сохранить',
    login: '🔑 Войти',
    logout: '🔑 Выйти',
    view: '☁️ Просмотреть'
  },
  en: {
    save: '💾 Save',
    login: '🔑 Login',
    logout: '🔑 Logout',
    view: '☁️ View Results'
  }
};

// Функция для обновления текста кнопок
function updateMobileButtons() {
  const isLoggedIn = auth.currentUser;
  
  // Устанавливаем текст на кнопках
  mobileSaveBtn.textContent = buttonTexts[currentLanguage].save;
  mobileLoginBtn.textContent = isLoggedIn 
    ? buttonTexts[currentLanguage].logout
    : buttonTexts[currentLanguage].login;
  mobileViewBtn.textContent = buttonTexts[currentLanguage].view;
}

// Инициализируем текст кнопок при загрузке страницы
updateMobileButtons();

// Обработчики для мобильных кнопок
mobileSaveBtn.addEventListener('click', () => {
  if (!auth.currentUser) {
    showModal("authModal", 'loginRequired');
    return;
  }
  saveResult();
});

mobileLoginBtn.addEventListener('click', () => {
  if (!auth.currentUser) {
    signInWithGoogle();
  } else {
    signOut(auth).then(() => {
      updateMobileButtons();
    }).catch((error) => {
      console.error("Ошибка при выходе:", error);
    });
  }
});

mobileViewBtn.addEventListener('click', () => {
  if (!auth.currentUser) {
    showModal("authModal", 'loginRequired');
    return;
  }
  showResults();
});

// Обновляем кнопки при изменении языка
function updateUILanguage() {
  updateMobileButtons();
  // ... остальной код функции
}

const showResultsBtn = document.getElementById("showResultsBtn");
const resultsModalEl = document.getElementById("resultsModal");
const resultsListEl = document.getElementById("resultsList");

showResultsBtn.addEventListener("click", async () => {
  if (!auth.currentUser) {
    showModal("authModal", 'loginRequired');
    return;
  }

  // Показываем модальное окно сразу
  const modal = new bootstrap.Modal(resultsModalEl);
  modal.show();

  // Загружаем список
  const entries = await loadResultsList();
  // Очищаем содержимое
  resultsListEl.innerHTML = "";

  if (entries.length === 0) {
    // Если нет результатов, показываем Траволту
    const noResultsDiv = document.createElement("div");
    noResultsDiv.classList.add("text-center", "py-4");
    
    const travoltaImg = document.createElement("img");
    travoltaImg.src = "img/travolta.gif";
    travoltaImg.alt = "Нет результатов";
    travoltaImg.style.maxWidth = "200px";
    
    const noResultsText = document.createElement("p");
    noResultsText.classList.add("mt-3", "text-muted");
    noResultsText.textContent = currentLanguage === "ru" ? 
      "Пока нет сохранённых результатов" : 
      "No saved results yet";
    
    noResultsDiv.appendChild(travoltaImg);
    noResultsDiv.appendChild(noResultsText);
    resultsListEl.appendChild(noResultsDiv);
    return;
  }

  entries.forEach((entry) => {
    // entry.id, entry.title, entry.createdAt, entry.data
    const row = document.createElement("div");
    row.classList.add("d-flex", "justify-content-between", "align-items-center", "mb-2");

    // Только дата
    const titleSpan = document.createElement("span");
    titleSpan.style.flexGrow = "1";
    titleSpan.style.marginRight = "1rem";
    const dateStr = entry.createdAt?.seconds
      ? new Date(entry.createdAt.seconds * 1000).toLocaleString()
      : new Date().toLocaleString();
    titleSpan.textContent = dateStr;

    // Контейнер для кнопок (с фиксированной позицией справа)
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("d-flex", "align-items-center");
    buttonsContainer.style.flexShrink = "0";

    // Кнопки «Загрузить» и «Удалить»
    const loadBtn = document.createElement("button");
    loadBtn.className = "btn btn-sm btn-primary me-2";
    loadBtn.textContent = "▶️";
    loadBtn.style.width = "40px"; // Фиксированная ширина для кнопок

    const delBtn = document.createElement("button");
    delBtn.className = "btn btn-sm btn-danger";
    delBtn.textContent = "❌";
    delBtn.style.width = "40px"; // Фиксированная ширина для кнопок

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
      
      // Обновляем общее среднее и колесо
      updateOverallAverage();
      drawWheel();
      
      // Закрываем модальное окно результатов
      const modal = bootstrap.Modal.getInstance(resultsModalEl);
      modal.hide();
      
      // Показываем модальное окно об успешной загрузке
      showModal("loadSuccessModal", 'loaded');
    });

    delBtn.addEventListener("click", async () => {
      showConfirmDeleteModal(async () => {
        try {
          await deleteSavedResult(entry.id);
          // Закрываем модальное окно
          const modal = bootstrap.Modal.getInstance(resultsModalEl);
          modal.hide();
          // Обновляем список результатов
          showResultsBtn.click();
          // Обновляем слайдер истории
          initializeHistorySlider();
          showModal("deleteSuccessModal", 'deleted');
        } catch (error) {
          console.error("Ошибка при удалении:", error);
          showModal("deleteErrorModal", 'deleteConfirm');
        }
      });
    });

    // Собираем структуру
    buttonsContainer.appendChild(loadBtn);
    buttonsContainer.appendChild(delBtn);
    row.appendChild(titleSpan);
    row.appendChild(buttonsContainer);
    resultsListEl.appendChild(row);
  });

  
});

// Модифицируем функцию drawWheel для использования с разными контекстами
function drawWheel(ctx, width, height) {
  // Сохраняем текущее состояние контекста
  ctx.save();
  
  // Очищаем канвас
  ctx.clearRect(0, 0, width, height);
  
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(width, height) / 2 - 30;
  
  // Рисуем колесо
  const anglePerSphere = (2 * Math.PI) / spheres.length;
  let startAngle = -Math.PI / 2;

  // Определяем базовые смещения для остальных сфер
  const shifts = {
    leftShift:   { x: 45,  y: 0 },
    rightShift:  { x: -60, y: 0 },
    topShift:    { x: 0,   y: -10 },
    bottomShift: { x: 0,   y: 10 }
  };
  const threshold = 0.2;

  // Устанавливаем выравнивание текста по центру
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "18px sans-serif";

  spheres.forEach((sphere) => {
    // Рассчитываем среднее значение для сферы
    let sum = 0, count = 0;
    sphere.questions.forEach((question) => {
      const slider = document.getElementById(`slider_${sphere.id}_${question.id}`);
      sum += parseInt(slider.value);
      count++;
    });
    const avg = sum / (count || 1);
    const fraction = avg / 10;
    const sectorRadius = fraction * maxRadius;

    // Рисуем сектор
    const endAngle = startAngle + anglePerSphere;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, sectorRadius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = sphere.color || "#CCC";
    ctx.fill();
    ctx.strokeStyle = darkMode ? "#ccc" : "#666";
    ctx.stroke();

    // Вычисляем позицию для текста по середине сектора
    const midAngle = startAngle + anglePerSphere / 2;
    const cosMid = Math.cos(midAngle);
    const sinMid = Math.sin(midAngle);
    const labelRadius = maxRadius + 10;
    let labelX = centerX + labelRadius * cosMid;
    let labelY = centerY + labelRadius * sinMid;

    // Формируем текст. Для сферы health сохраняем нужный порядок,
    // а для остальных – динамически выбираем сдвиг.
    const sphereTitle = sphere.title[currentLanguage] || sphere.title["en"];
    let text = "";
    let shift = { x: 0, y: 0 };

    // Специальные сдвиги для сфер "Саморазвитие" и "Яркость жизни"
    if (sphere.id === "selfImprovement" || sphere.id === "lifeBrightness") {
      shift.x = 10; // сдвиг вправо на 10 пикселей
    }

    if (sphere.id === "health") {
      // Для health используем фиксированный порядок, но не смещаем текст вручную
      text = `${sphereTitle} ${avg.toFixed(1)} ${sphere.emoji || ""}`;
      shift = { x: 0, y: 0 };
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

    // Рисуем текст – благодаря center-выравниванию он всегда будет центрирован относительно (labelX, labelY)
    ctx.shadowColor = darkMode ? "#000" : "#fff";
    ctx.shadowBlur = 2;
    ctx.fillStyle = darkMode ? "#fff" : "#000";
    ctx.fillText(text, labelX, labelY);
    ctx.shadowBlur = 0;

    // Рисуем разделительную линию
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + maxRadius * Math.cos(startAngle),
               centerY + maxRadius * Math.sin(startAngle));
    ctx.stroke();

    startAngle = endAngle;
  });

  // Финальный разделитель
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX + maxRadius * Math.cos(startAngle),
             centerY + maxRadius * Math.sin(startAngle));
  ctx.stroke();
  
  // Восстанавливаем состояние контекста
  ctx.restore();
}

/****************************************
 * 3. РЕНДЕР ВКЛАДОК И ЭЛЕМЕНТОВ UI
 ****************************************/
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
    // Создаём вкладку
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
    // Текст на вкладке (мобильная/десктопная версия)
    if (isMobileView) {
      btn.innerHTML = `<span class="tab-emoji">${sphere.emoji || ""}</span> <span class="tab-average">${avg}</span>`;
    } else {
      btn.innerHTML = `<span class="tab-emoji">${sphere.emoji || ""}</span> <span class="tab-title">${sphere.title[currentLanguage]}</span> <span class="tab-average">(${avg})</span>`;
    }
    li.appendChild(btn);
    tabList.appendChild(li);

    // Контент вкладки
    const pane = document.createElement("div");
    pane.className = "tab-pane fade";
    pane.id = "pane-" + sphere.id;
    pane.role = "tabpanel";

    const header = document.createElement("h5");
    header.innerText = `${sphere.emoji || ""} ${sphere.title[currentLanguage]} - ${avg}`;
    header.className = "mb-3 mt-3";
    pane.appendChild(header);

    // Вопросы с ползунками
    sphere.questions.forEach((question) => {
      const formGroup = document.createElement("div");
      formGroup.className = "mb-3";

      const label = document.createElement("label");
      label.className = "form-label sphere-header";
      label.setAttribute("for", `slider_${sphere.id}_${question.id}`);
      label.innerText = question.title[currentLanguage];
      formGroup.appendChild(label);

      // Обёртка для слайдера + описание
      const sliderWrapper = document.createElement("div");
      sliderWrapper.className = "slider-wrapper";

      // -- ВАЖНО: range-container --
      // Здесь создаём div с классом "range-container", внутрь которого кладём сам <input type="range">
      const rangeContainer = document.createElement("div");
      rangeContainer.className = "range-container";

      // Создаём сам слайдер
      const slider = document.createElement("input");
      slider.type = "range";
      slider.className = "form-range slider-control";
      slider.id = `slider_${sphere.id}_${question.id}`;
      slider.min = "0";
      slider.max = "10";
      slider.value = (savedValues[sphere.id] && savedValues[sphere.id][question.id]) || "5";
      // Цвет thumb берём из sphere.color
      slider.style.setProperty('--slider-thumb-color', sphere.color);

      slider.addEventListener("input", () => {
        updateSliderDisplay(sphere.id, question.id, slider.value);
        updateSphereAverage(sphere.id);
        drawWheel();
      });

      // Описание
      const desc = document.createElement("div");
      desc.id = `desc_${sphere.id}_${question.id}`;
      desc.className = "form-text slider-desc";
      const initVal = slider.value;
      desc.innerText = question.descriptions[initVal]
        ? question.descriptions[initVal][currentLanguage]
        : "";
      let val = parseInt(initVal, 10);
      let fraction = val / 10; // <-- вместо (val - 1)/9
      let r = Math.round(255 * (1 - fraction));
      let g = Math.round(255 * fraction);
      desc.style.color = `rgb(${r}, ${g}, 0)`;

      // Вкладываем слайдер в rangeContainer
      rangeContainer.appendChild(slider);
      // Затем добавляем rangeContainer и описание в sliderWrapper
      sliderWrapper.appendChild(rangeContainer);
      sliderWrapper.appendChild(desc);

      // Вкладываем sliderWrapper в formGroup
      formGroup.appendChild(sliderWrapper);
      pane.appendChild(formGroup);
    });

    tabContent.appendChild(pane);
  });

  updateOverallAverage();

  // Восстанавливаем активную вкладку
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

  // Обработчики для вкладок
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
      // При клике оставляем тень
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
      tab.style.color = "#333"; 
    } else {
      tab.style.backgroundColor = "";
      // В тёмной теме неактивные вкладки – белый текст, в светлой – чёрный
      tab.style.color = darkMode ? "#fff" : "#000";
    }
  });
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
  paneHeader.innerText = `${sphere.emoji || ""} ${sphere.title[currentLanguage]} - ${avg}`;
  updateOverallAverage();
}

// Функция для обновления отображения даты
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
    // Для русского: "24 марта 2025"
    const monthName = monthsRu[monthIndex];
    const dateString = `${day} ${monthName} ${year}`;
    document.getElementById("currentDate").innerText = `(${dateString})`;
  } else {
    // Для английского: "March 24, 2025"
    const monthName = monthsEn[monthIndex];
    const dateString = `${monthName} ${day}, ${year}`;
    document.getElementById("currentDate").innerText = `(${dateString})`;
  }
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
  let fraction = val / 10; // <-- вместо (val - 1)/9
  let r = Math.round(255 * (1 - fraction));
  let g = Math.round(255 * fraction);
  descElem.style.color = `rgb(${r}, ${g}, 0)`;

  updateSphereAverage(sphereId); // Учитывает мобильный режим
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

function updateTabStyles() {
  const tabLinks = document.querySelectorAll("#sphereTabs .nav-link");
  tabLinks.forEach(tab => {
    if (tab.classList.contains("active")) {
      tab.style.backgroundColor = tab.getAttribute("data-color");
      tab.style.color = "#333333"; // активная вкладка – тёмно-серый текст
    } else {
      tab.style.backgroundColor = "";
      // В тёмной теме неактивные вкладки – белый текст, в светлой – чёрный
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
  let fraction = val / 10; // <-- вместо (val - 1)/9
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

  const avg = (sum / (count || 1)).toFixed(1); // Округляем до 1 знака после запятой
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

/****************************************
 * 4. РИСОВАНИЕ «КОЛЕСА» (СЕКТОРОВ)
 ****************************************/
// 1) ВНЕ функции — никакой prevSide не нужен, если вы фиксируете именно "Health".

function drawWheel() {
  const canvas = document.getElementById("balanceWheel");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(width, height) / 2 - 30;
  const anglePerSphere = (2 * Math.PI) / spheres.length;
  let startAngle = -Math.PI / 2;

  // Определяем базовые смещения для остальных сфер
  const shifts = {
    leftShift:   { x: 45,  y: 0 },
    rightShift:  { x: -60, y: 0 },
    topShift:    { x: 0,   y: -10 },
    bottomShift: { x: 0,   y: 10 }
  };
  const threshold = 0.2;

  // Устанавливаем выравнивание текста по центру
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "18px sans-serif";

  spheres.forEach((sphere) => {
    // Рассчитываем среднее значение для сферы
    let sum = 0, count = 0;
    sphere.questions.forEach((question) => {
      const slider = document.getElementById(`slider_${sphere.id}_${question.id}`);
      sum += parseInt(slider.value);
      count++;
    });
    const avg = sum / (count || 1);
    const fraction = avg / 10;
    const sectorRadius = fraction * maxRadius;

    // Рисуем сектор
    const endAngle = startAngle + anglePerSphere;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, sectorRadius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = sphere.color || "#CCC";
    ctx.fill();
    ctx.strokeStyle = darkMode ? "#ccc" : "#666";
    ctx.stroke();

    // Вычисляем позицию для текста по середине сектора
    const midAngle = startAngle + anglePerSphere / 2;
    const cosMid = Math.cos(midAngle);
    const sinMid = Math.sin(midAngle);
    const labelRadius = maxRadius + 10;
    let labelX = centerX + labelRadius * cosMid;
    let labelY = centerY + labelRadius * sinMid;

    // Формируем текст. Для сферы health сохраняем нужный порядок,
    // а для остальных – динамически выбираем сдвиг.
    const sphereTitle = sphere.title[currentLanguage] || sphere.title["en"];
    let text = "";
    let shift = { x: 0, y: 0 };

    // Специальные сдвиги для сфер "Саморазвитие" и "Яркость жизни"
    if (sphere.id === "selfImprovement" || sphere.id === "lifeBrightness") {
      shift.x = 10; // сдвиг вправо на 10 пикселей
    }

    if (sphere.id === "health") {
      // Для health используем фиксированный порядок, но не смещаем текст вручную
      text = `${sphereTitle} ${avg.toFixed(1)} ${sphere.emoji || ""}`;
      shift = { x: 0, y: 0 };
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

    // Рисуем текст – благодаря center-выравниванию он всегда будет центрирован относительно (labelX, labelY)
    ctx.shadowColor = darkMode ? "#000" : "#fff";
    ctx.shadowBlur = 2;
    ctx.fillStyle = darkMode ? "#fff" : "#000";
    ctx.fillText(text, labelX, labelY);
    ctx.shadowBlur = 0;

    // Рисуем разделительную линию
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + maxRadius * Math.cos(startAngle),
               centerY + maxRadius * Math.sin(startAngle));
    ctx.stroke();

    startAngle = endAngle;
  });

  // Финальный разделитель
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX + maxRadius * Math.cos(startAngle),
             centerY + maxRadius * Math.sin(startAngle));
  ctx.stroke();
}

/****************************************
 * 5. ПЕРЕКЛЮЧАТЕЛИ ТЕМЫ И ЯЗЫКА
 ****************************************/
function setupButtons() {
  console.log("setupButtons started");
  
  // Скрываем контент FAQ по умолчанию
  const faqContent = document.getElementById("faqContent");
  const sphereTabContent = document.getElementById("sphereTabContent");
  
  console.log("FAQ elements initialization:");
  console.log("faqContent:", faqContent);
  console.log("sphereTabContent:", sphereTabContent);
  
  if (faqContent) {
    faqContent.style.display = "block";
    faqContent.innerHTML = faqInstructions[currentLanguage];
    console.log("faqContent initialized");
  }
  if (sphereTabContent) {
    sphereTabContent.style.display = "block";
    console.log("sphereTabContent initialized");
  }

  // Обработчики для кнопок, которые находятся как в фиксированном хедере (на десктопе), так и внизу (на мобильном)
  const themeBtn = document.getElementById("themeToggle");
  const langBtn = document.getElementById("langToggle");

  themeBtn.addEventListener("click", () => {
    darkMode = !darkMode;
    document.body.classList.toggle("dark-mode", darkMode);
  
    // Меняем текст кнопки в зависимости от языка
    themeBtn.innerText = darkMode
      ? (currentLanguage === "ru" ? "🌙 Тёмная" : "🌙 Dark")
      : (currentLanguage === "ru" ? "🌞 Светлая" : "🌞 Light");
  
      updateUILanguage();
    updateTabStyles();
    drawWheel();
  });
  
  // Глобальный объект с инструкциями FAQ (не внутри обработчика FAQ)
  

  
  

  function handleFaqClick() {
    console.log("handleFaqClick called");
    console.log("faqContent:", document.getElementById("faqContent"));
    console.log("sphereTabContent:", document.getElementById("sphereTabContent"));
    
    const faqContent = document.getElementById("faqContent");
    const sphereTabContent = document.getElementById("sphereTabContent");
    
    if (faqContent && sphereTabContent) {
      // Обновляем содержимое FAQ
      faqContent.innerHTML = faqInstructions[currentLanguage];
      
      // Показываем FAQ, скрываем контент сфер
      sphereTabContent.style.display = "none";
      faqContent.style.display = "block";

      // Снимаем активное состояние со всех вкладок сфер
      const tabLinks = document.querySelectorAll("#sphereTabs .nav-link");
      tabLinks.forEach(tab => {
        tab.classList.remove("active");
        tab.style.boxShadow = 'none';
        const targetPane = document.querySelector(tab.getAttribute("data-bs-target"));
        if (targetPane) {
          targetPane.classList.remove("show", "active");
        }
      });

      console.log("FAQ content updated and shown");
      console.log("faqContent display:", faqContent.style.display);
      console.log("sphereTabContent display:", sphereTabContent.style.display);

      // Прокручиваем к верху страницы только на мобильных устройствах
      if (window.innerWidth <= 576) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      console.log("FAQ elements not found!");
    }
  }

  // Прикрепляем обработчик к обеим кнопкам FAQ:
  const faqBtnDesktop = document.getElementById("faqBtnDesktop");
  const faqBtnMobile = document.getElementById("faqBtnMobile");
  
  console.log("FAQ buttons initialization:");
  console.log("faqBtnDesktop:", faqBtnDesktop);
  console.log("faqBtnMobile:", faqBtnMobile);
  
  if (faqBtnDesktop) {
    faqBtnDesktop.addEventListener("click", handleFaqClick);
  }
  if (faqBtnMobile) {
    faqBtnMobile.addEventListener("click", handleFaqClick);
  }
  
  langBtn.addEventListener("click", () => {
    // Сохраняем текущее состояние FAQ (открыт или закрыт)
    const faqContent = document.getElementById("faqContent");
    const faqIsOpen = faqContent.style.display !== "none";
  
    // 1. Сохраняем значения ползунков
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
  

    
    // 2. Переключаем язык
    currentLanguage = (currentLanguage === "ru") ? "en" : "ru";
  
    // 3. Обновляем текст кнопок
    langBtn.innerText = (currentLanguage === "ru") ? "🌐 RU" : "🌐 EN";
    themeBtn.innerText = darkMode
      ? (currentLanguage === "ru" ? "🌙 Тёмная" : "🌙 Dark")
      : (currentLanguage === "ru" ? "🌞 Светлая" : "🌞 Light");
    const savePdfBtn = document.getElementById("savePDF");
    savePdfBtn.innerText = (currentLanguage === "ru") ? "🔽 PDF" : "🔽 PDF";
  
    // 4. Обновляем дату
    updateDateDisplay();
    updateUILanguage();
  
    // 5. Перерисовываем вкладки (контент сфер) – эта функция создаёт новые элементы,
    // поэтому после неё нужно снова прикрепить обработчики вкладок.
    renderTabs();
  
    // 6. Восстанавливаем значения ползунков
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
  
    // 7. Обновляем стили вкладок и перерисовываем колесо
    updateTabStyles();
    drawWheel();
  
    // 8. Если FAQ открыт, обновляем его содержимое на новый язык
    if (faqIsOpen) {
      faqContent.innerHTML = faqInstructions[currentLanguage];
      // При переключении языка оставляем FAQ открытым (display не меняем)
    }
  
    // 9. Прикрепляем обработчики к вкладкам, чтобы при их клике FAQ закрывался и показывался контент сфер
    const sphereTabs = document.querySelectorAll("#sphereTabs .nav-link");
    sphereTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        faqContent.style.display = "none";
        document.getElementById("sphereTabContent").style.display = "block";
      });
    });
  });
  
  
  
}

  renderTabs();
  updateDateDisplay();
  drawWheel();
  setupButtons();




const sphereTabs = document.querySelectorAll("#sphereTabs .nav-link");
sphereTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    document.getElementById("faqContent").style.display = "none";
    document.getElementById("sphereTabContent").style.display = "block";
  });
});

// Функция для инициализации слайдера истории изменений
function initializeHistorySlider() {
  console.log("Инициализация слайдера истории");
  
  // Загружаем все результаты
  loadResultsList().then(entries => {
    console.log("Загружены результаты:", entries);
    
    if (entries.length < 2) {
      console.log("Менее двух записей, скрываем слайдер");
      // Скрываем слайдер, если записей меньше двух
      document.getElementById("historySliderContainer").classList.add("d-none");
      return;
    }

    console.log("Показываем слайдер, записей:", entries.length);
    
    // Показываем слайдер
    const historySliderContainer = document.getElementById("historySliderContainer");
    historySliderContainer.classList.remove("d-none");

    // Сортируем записи по дате
    entries.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);
    console.log("Записи отсортированы, первая запись:", new Date(entries[0].createdAt.seconds * 1000));

    // Инициализируем слайдер
    const historySlider = document.getElementById("historySlider");
    historySlider.min = "0";
    historySlider.max = entries.length - 1;
    historySlider.value = entries.length - 1;

    // Обновляем отображение даты
    updateHistoryDateDisplay(historySlider.value, entries);

    // Обновляем канвас для текущей позиции
    updateCanvasFromHistory(entries, historySlider.value);

    // Добавляем обработчик для слайдера
    historySlider.addEventListener("input", (e) => {
      console.log("Слайдер перемещен, новое значение:", e.target.value);
      const value = e.target.value;
      updateHistoryDateDisplay(value, entries);
      updateCanvasFromHistory(entries, value);
    });
  }).catch(error => {
    console.error("Ошибка при загрузке результатов:", error);
    showModal("loadErrorModal", 'loaded');
  });
}

// Функция для обновления отображаемой даты
function updateHistoryDateDisplay(value, entries) {
  const entry = entries[value];
  const date = new Date(entry.createdAt.seconds * 1000);
  document.getElementById("historyDateDisplay").textContent = date.toLocaleString();
}

// Функция для обновления канваса из истории
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

/****************************************
 * 6. ТЕКУЩАЯ ДАТА И СОХРАНЕНИЕ В JSON/PDF
 ****************************************/



  function initPdfFonts(doc) {
    doc.addFileToVFS("DejaVuSans.ttf", DejaVuSansTTF);
    doc.addFont("DejaVuSans.ttf", "DejaVuSans", "normal");
    doc.setFont("DejaVuSans", "normal");
  }

  // Функция для форматирования даты в зависимости от языка
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
      // Для русского: "24 марта 2025"
      const monthName = monthsRu[monthIndex];
      const dateString = `${day} ${monthName} ${year}`;
      document.getElementById("currentDate").innerText = `(${dateString})`;
    } else {
      // Для английского: "March 24, 2025"
      const monthName = monthsEn[monthIndex];
      const dateString = `${monthName} ${day}, ${year}`;
      document.getElementById("currentDate").innerText = `(${dateString})`;
    }
  }

  // Сохранение в JSON
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

  // Сохранение в PDF
  document.getElementById("savePDF")?.addEventListener("click", async () => {
    // Дождёмся загрузки шрифтов (для кириллицы и т.п.)
    await document.fonts.ready;

    // 1) Сохраняем текущее состояние тёмной темы
    const originalDarkMode = darkMode;

    // 2) Принудительно переключаем на светлую тему
    darkMode = false;
    document.body.classList.remove("dark-mode");

    // (Необязательно) Увеличиваем размер канваса, если хотим более крупный вывод
    const canvas = document.getElementById("balanceWheel");
    canvas.width = 800;   // например
    canvas.height = 800;  // например

    // 3) Перерисовываем колесо (теперь оно будет в светлой теме)
    drawWheel();

    // 4) Включаем сглаживание / высокое качество
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // 5) Заливка фона белым (чтобы PDF всегда был светлым)
    fillCanvasBackground(canvas, "#ffffff");

    // Немного ждём, чтобы изменения успели отобразиться
    setTimeout(() => {
      // -- Формирование PDF --
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ unit: "px", format: "a4" });
      initPdfFonts(doc);

      const now = new Date();
      const day = now.getDate();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();
      const dateString = `${day}.${month}.${year}`;

      // Превращаем канвас в картинку
      const canvasData = canvas.toDataURL("image/png");

      let yPos = 20;
      const margin = 20;
      const pageHeight = doc.internal.pageSize.height;
      const pageWidth = doc.internal.pageSize.getWidth();
      const maxTextWidth = pageWidth - margin * 2;

      doc.setFontSize(12);
      doc.text(`Mentorist Balance Wheel (${dateString})`, margin, yPos);
      yPos += 20;

      // Вставляем картинку колеса
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

      // Подсчёт общего среднего
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

      // Сохраняем PDF
      doc.save("results.pdf");
    }, 200); // небольшая задержка

    // 6) Возвращаем всё, как было (тёмная/светлая тема, исходные размеры)
    setTimeout(() => {
      darkMode = originalDarkMode;
      if (darkMode) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
      // Если меняли размеры канваса – можно вернуть:
      // canvas.width = 600;
      // canvas.height = 600;

      // Перерисовываем колесо обратно
      drawWheel();
    }, 600);
  });


  let lastScrollTop = 0;
window.addEventListener("scroll", function() {
  // Если экран десктопный, выходим и не скрываем вкладки
  if (window.innerWidth >= 576) return;

  let st = window.pageYOffset || document.documentElement.scrollTop;
  if (st > lastScrollTop) {
    // Скроллим вниз – скрываем вкладки
    document.getElementById("sphereTabs").style.transform = "translateY(-200%)";
  } else {
    // Скроллим вверх – показываем вкладки
    document.getElementById("sphereTabs").style.transform = "translateY(0)";
  }
  lastScrollTop = st <= 0 ? 0 : st;
}, false);

// Добавляем обработку движения мыши для 3D эффекта
const canvasContainer = document.getElementById('balanceWheelContainer');
const glow = document.querySelector('.glow');
let bounds;

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

  canvasContainer.style.transform = `
    scale3d(1.07, 1.07, 1.07)
    rotate3d(
      ${center.y / 100},
      ${-center.x / 100},
      0,
      ${Math.log(distance) * 2}deg
    )
  `;

  // Обновляем позицию блеска
  glow.style.backgroundImage = `
    radial-gradient(
      circle at
      ${center.x * 2 + bounds.width/2}px
      ${center.y * 2 + bounds.height/2}px,
      #ffffff55,
      #0000000f
    )
  `;
}

canvasContainer.addEventListener('mouseenter', () => {
  bounds = canvasContainer.getBoundingClientRect();
  document.addEventListener('mousemove', rotateCanvas);
});

canvasContainer.addEventListener('mouseleave', () => {
  document.removeEventListener('mousemove', rotateCanvas);
  canvasContainer.style.transform = '';
  glow.style.backgroundImage = 'radial-gradient(circle at 50% -20%, #ffffff22, #0000000f)';
});

const loginBtn = document.getElementById("loginBtn");
const userInfo = document.getElementById("userInfo"); // div, где показываем имя

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("Пользователь авторизован:", user.uid);
    // Инициализируем слайдер истории после авторизации
    initializeHistorySlider();
    // Если выбран русский язык, меняем на "Выйти", иначе "Logout"
    loginBtn.innerText = currentLanguage === "ru" ? "👤 Выйти" : "👤 Logout";
    // Выводим имя пользователя или email
    userInfo.textContent = user.displayName || user.email || "";
  } else {
    console.log("Пользователь не авторизован");
    // Пользователь не вошёл
    loginBtn.innerText = currentLanguage === "ru" ? "👤 Войти" : "👤 Login";
    userInfo.textContent = "";
    // Скрываем слайдер если пользователь вышел
    const historySliderContainer = document.getElementById("historySliderContainer");
    if (historySliderContainer) {
      historySliderContainer.classList.add("d-none");
    }
  }
  updateUILanguage();
});

// Обработчик клика по кнопке Login/Logout
loginBtn.addEventListener("click", () => {
  if (auth.currentUser) {
    // Пользователь залогинен – выполняем выход
    signOut(auth)
      .then(() => {
        console.log("Пользователь вышел");
        // onAuthStateChanged обновит UI автоматически
      })
      .catch((err) => {
        console.error("Ошибка при выходе:", err);
        showModal("logoutErrorModal", 'loginRequired');
      });
  } else {
    // Пользователь не залогинен – открываем модальное окно для входа
    const loginModal = new bootstrap.Modal(loginModalEl, {
      backdrop: true, // можно использовать "static", если не хотите закрывать при клике вне модалки
      keyboard: true
    });
    loginModal.show();

    // Также можно добавить обработчик события скрытия модалки,
    // чтобы при закрытии (например, нажатием на крестик) backdrop точно удалялся:
    loginModalEl.addEventListener("hidden.bs.modal", () => {
      // Удаляем модалку (или делаем какие-то действия)
      // Если backdrop остается, можно попробовать вызвать loginModal.dispose();
      loginModal.dispose();
    });
  }
});

// Обработчик клика по кнопке Google Sign In
// googleSignInBtn.addEventListener("click", async () => {
//   const provider = new GoogleAuthProvider();
//   try {
//     const result = await signInWithPopup(auth, provider);
//     console.log("Пользователь авторизован:", result.user.uid);
//   } catch (error) {
//     console.error("Ошибка при входе:", error);
//     showModal("loginErrorModal", 'loginRequired');
//   }
// });

// Обработчик клика по кнопке Google Sign Out
// googleSignOutBtn.addEventListener("click", async () => {
//   try {
//     await signOut(auth);
//     console.log("Пользователь вышел");
//   } catch (error) {
//     console.error("Ошибка при выходе:", error);
//     showModal("logoutErrorModal", 'loginRequired');
//   }
// });

function updateUILanguage() {
  // Обновляем текст кнопки логина/выхода
  if (auth.currentUser) {
    loginBtn.innerText = currentLanguage === "ru" ? "👤 Выйти" : "👤 Logout";
  } else {
    loginBtn.innerText = currentLanguage === "ru" ? "👤 Войти" : "👤 Login";
  }
  
  // Обновляем текст в модальном окне
  const loginModalLabel = document.getElementById("loginModalLabel");
  const modalBodyText = document.querySelector("#loginModal .modal-body p");
  // const googleSignInBtn = document.getElementById("googleSignInBtn");
  
  if (currentLanguage === "ru") {
    loginModalLabel.innerText = "Вход";
    modalBodyText.innerText = "Войдите с помощью:";
    // googleSignInBtn.innerText = "Google";
  } else {
    loginModalLabel.innerText = "Login";
    modalBodyText.innerText = "Sign in with:";
    // googleSignInBtn.innerText = "Google";
  }
  
  // Если у вас есть другие элементы с переводом – обновите и их
}

function showModal(modalId, messageKey = null) {
  const modal = document.getElementById(modalId);
  if (modal && messageKey) {
    const modalTitle = modal.querySelector('.modal-title');
    const modalBody = modal.querySelector('.modal-body');
    
    // Получаем переводы для текущего языка
    const translations = modalTranslations[currentLanguage];
    
    // Обновляем заголовок и текст модального окна
    if (modalTitle) {
      modalTitle.textContent = translations[messageKey] || translations.success;
    }
    if (modalBody) {
      modalBody.textContent = translations[messageKey] || translations.success;
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
      modalBody.textContent = translations.deleteConfirm;
    }
    
    if (confirmBtn) {
      confirmBtn.textContent = translations.delete;
      confirmBtn.onclick = () => {
        // Сначала скрываем модальное окно подтверждения
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();
        
        // Затем выполняем подтверждение
        onConfirm();
      };
    }
    
    if (cancelBtn) {
      cancelBtn.textContent = translations.cancel || 'Cancel';
    }
    
    // Показываем модальное окно в конце
    new bootstrap.Modal(modal).show();
  }
}

function showLoadResultModal(date) {
  document.getElementById("loadResultDate").textContent = date.toLocaleString();
  showModal("loadResultModal", 'loaded');
}

function showLoadResultModal(date) {
  document.getElementById("loadResultDate").textContent = date.toLocaleString();
  showModal("loadResultModal", 'loaded');
}
})(); // Закрывающая скобка для внешнего обработчика событий

function updateResultsModalTitle() {
  const resultsModalTitle = document.querySelector('#resultsModal .modal-title');
  if (resultsModalTitle) {
    resultsModalTitle.textContent = modalTranslations[currentLanguage].myResults;
  }
}

// Обновляем функцию showResultsBtn для использования переведенного заголовка
showResultsBtn.addEventListener("click", async () => {
  if (!auth.currentUser) {
    showModal("authModal", 'loginRequired');
    return;
  }
  
  try {
    const entries = await loadResultsList();
    
    // Обновляем заголовок модального окна
    updateResultsModalTitle();
    
    // Создаем контент для списка результатов
    const resultsList = document.getElementById("resultsList");
    if (resultsList) {
      resultsList.innerHTML = "";
      
      if (entries.length === 0) {
        resultsList.innerHTML = `<p class="text-center">${modalTranslations[currentLanguage].noResults}</p>`;
        return;
      }
      
      entries.forEach((entry, index) => {
        const date = new Date(entry.date);
        const formattedDate = date.toLocaleString();
        
        const entryDiv = document.createElement("div");
        entryDiv.className = "card mb-2";
        entryDiv.innerHTML = `
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <span>${formattedDate}</span>
              <div>
                <button class="btn btn-sm btn-primary me-2" data-entry-id="${entry.id}">
                  ${modalTranslations[currentLanguage].load}
                </button>
                <button class="btn btn-sm btn-danger" data-entry-id="${entry.id}">
                  ❌
                </button>
              </div>
            </div>
          </div>
        `;
        
        resultsList.appendChild(entryDiv);
      });
    }
    
    // Показываем модальное окно
    new bootstrap.Modal(document.getElementById("resultsModal")).show();
    
    // Добавляем обработчики для кнопок загрузки и удаления
    document.querySelectorAll("#resultsList .btn-primary").forEach(btn => {
      btn.onclick = async () => {
        const data = await loadSavedResult(btn.dataset.entryId);
        if (!data) {
          showModal("loadErrorModal", 'loaded');
          return;
        }
        
        // Обновляем данные на странице
        Object.keys(data.spheres).forEach(sphereId => {
          const sphereData = data.spheres[sphereId];
          sphereData.questions.forEach((question, index) => {
            const slider = document.getElementById(`slider_${sphereId}_${index}`);
            if (slider) {
              slider.value = question.value;
              updateSliderDisplay(sphereId, index, question.value);
            }
          });
        });
        
        // Обновляем дату
        document.getElementById("currentDate").textContent = 
          `(${data.date.toLocaleString()})`;
        
        // Обновляем средние значения
        updateSphereAverage(sphereId);
        updateOverallAverage();
        
        // Обновляем колесо
        drawWheel();
        
        // Показываем модальное окно об успешной загрузке
        showModal("loadSuccessModal", 'loaded');
      };
    });
    
    document.querySelectorAll("#resultsList .btn-danger").forEach(btn => {
      btn.onclick = () => {
        showConfirmDeleteModal(async () => {
          try {
            await deleteSavedResult(btn.dataset.entryId);
            // Закрываем модальное окно
            const modal = bootstrap.Modal.getInstance(resultsModalEl);
            modal.hide();
            // Обновляем список результатов
            showResultsBtn.click();
            // Обновляем слайдер истории
            initializeHistorySlider();
            showModal("deleteSuccessModal", 'deleted');
          } catch (error) {
            console.error("Ошибка при удалении:", error);
            showModal("deleteErrorModal", 'deleteConfirm');
          }
        });
      };
    });
  } catch (error) {
    console.error("Ошибка при загрузке результатов:", error);
    showModal("loadErrorModal", 'loaded');
  }
});