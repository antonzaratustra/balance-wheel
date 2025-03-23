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
saveToCloudBtn.addEventListener("click", () => {
  if (!auth.currentUser) {
    alert("Сначала войдите в систему!");
    return;
  }
  const title = prompt("Введите название результата:", "Мой результат");
  if (title) {
    // spheres — это ваш массив сфер
    saveResultToFirestore(title, spheres);
  }
});




const showResultsBtn = document.getElementById("showResultsBtn");
const resultsModalEl = document.getElementById("resultsModal");
const resultsListEl = document.getElementById("resultsList");

showResultsBtn.addEventListener("click", async () => {



  if (!auth.currentUser) {
    alert("Сначала войдите в систему!");
    return;
  }

  // Загружаем список
  const entries = await loadResultsList();
  // Очищаем содержимое
  resultsListEl.innerHTML = "";

  entries.forEach((entry) => {
    // entry.id, entry.title, entry.createdAt, entry.data
    const row = document.createElement("div");
    row.classList.add("d-flex", "justify-content-between", "align-items-center", "mb-2");

    // Название и дата
    const titleSpan = document.createElement("span");
    const dateStr = entry.createdAt?.seconds
      ? new Date(entry.createdAt.seconds * 1000).toLocaleString()
      : "(no date)";
    titleSpan.textContent = `${entry.title || "Без названия"} — ${dateStr}`;

    // Кнопки «Загрузить» и «Удалить»
    const loadBtn = document.createElement("button");
    loadBtn.className = "btn btn-sm btn-primary me-2";
    loadBtn.textContent = "Загрузить";
    loadBtn.addEventListener("click", () => {
      loadSavedResult(entry.id); // применит ползунки
    });

    const delBtn = document.createElement("button");
    delBtn.className = "btn btn-sm btn-danger";
    delBtn.textContent = "Удалить";
    delBtn.addEventListener("click", async () => {
      if (confirm("Точно удалить результат?")) {
        await deleteSavedResult(entry.id);
        // Обновим список заново
        showResultsBtn.click(); // повторно вызываем клик, чтобы обновить
      }
    });

    row.appendChild(titleSpan);
    row.appendChild(loadBtn);
    row.appendChild(delBtn);
    resultsListEl.appendChild(row);
  });

  // Открываем модалку
  const modal = new bootstrap.Modal(resultsModalEl);
  modal.show();
  
});



















  
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
    btn.className = "nav-link";
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
      let fraction = val / 10;
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
    // Если активной вкладки нет, делаем первую активной
    const firstTab = document.querySelector("#sphereTabs .nav-link");
    const firstPane = document.querySelector("#sphereTabContent .tab-pane");
    if (firstTab && firstPane) {
      firstTab.classList.add("active");
      firstPane.classList.add("show", "active");
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
  });
  updateTabStyles();
}




function updateTabStyles() {
  const tabLinks = document.querySelectorAll("#sphereTabs .nav-link");
  const isMobileView = window.innerWidth < 576; // true, если ширина < 576px

  tabLinks.forEach(tab => {
    if (tab.classList.contains("active")) {
      // Активная вкладка — цвет сферы (как было)
      // Пишем с !important, чтобы перебить любые другие стили
      tab.style.setProperty("background-color", tab.getAttribute("data-color"), "important");
      tab.style.color = "#333"; 
    } else {
      // НЕактивная вкладка
      if (darkMode) {
        // Тёмная тема
        // На мобильном у вас фон контейнера #333333 => вкладка делаем #444444 
        // На десктопе фон контейнера #1f1f1f => вкладку делаем #2a2a2a (или чуть темнее/светлее по вкусу)
        let inactiveBg = isMobileView ? "#444444" : "#2a2a2a";
        tab.style.setProperty("background-color", inactiveBg, "important");
        tab.style.color = "#fff";
      } else {
        // Светлая тема
        // На мобильном фон контейнера #e0e0e0 => вкладку делаем #dddddd (или #d0d0d0)
        // На десктопе фон контейнера #f0f0f0 => вкладку делаем #e0e0e0
        let inactiveBg = isMobileView ? "#dddddd" : "#e0e0e0";
        tab.style.setProperty("background-color", inactiveBg, "important");
        tab.style.color = "#000";
      }
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
  const tabButton = document.getElementById("tab-" + sphere.id);
  if (isMobile) {
    // На мобильном – только эмодзи и число (без скобок и без названия)
    tabButton.innerHTML = `<span class="tab-emoji">${sphere.emoji || ""}</span> <span class="tab-average">${avg}</span>`;
  } else {
    tabButton.innerHTML = `<span class="tab-emoji">${sphere.emoji || ""}</span> <span class="tab-title">${sphere.title[currentLanguage]}</span> <span class="tab-average">(${avg})</span>`;
  }
  const paneHeader = document.querySelector(`#pane-${sphere.id} h5`);
  paneHeader.innerText = `${sphere.emoji || ""} ${sphere.title[currentLanguage]} - ${avg}`;
  updateOverallAverage();
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
  const descElem = document.getElementById(`desc_${sphereId}_${question.id}`);
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
  const tabButton = document.getElementById("tab-" + sphere.id);
  const isMobile = window.innerWidth < 576;

  if (isMobile) {
    tabButton.innerHTML = `<span class="tab-emoji">${sphere.emoji || ""}</span> <span class="tab-average">${avg}</span>`;
  } else {
    tabButton.innerHTML = `<span class="tab-emoji">${sphere.emoji || ""}</span> <span class="tab-title">${sphere.title[currentLanguage]}</span> <span class="tab-average">(${avg})</span>`;
  }

  const paneHeader = document.querySelector(`#pane-${sphere.id} h5`);
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


/****************************************
 * 4. РИСОВАНИЕ «КОЛЕСА» (СЕКТОРОВ)
 ****************************************/
// 1) ВНЕ функции — никакой prevSide не нужен, если вы фиксируйте именно "Health".

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
      sum += parseInt(slider.value, 10);
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
  const faqInstructions = {
    ru: `<strong>Добро пожаловать в Mentorist Balance Wheel!</strong><br><br>
  Это инструмент для оценки баланса жизни по 8 ключевым сферам: Здоровье, Отношения, Окружение, Призвание, Финансы, Саморазвитие, Яркость жизни и Духовность.<br><br>
  <strong>1. Тема и язык:</strong> Используйте кнопки для смены темы и языка <span class="btn-like">🌐 RU</span> and <span class="btn-like">🌙 Тёмная</span> / <span class="btn-like">🌞 Светлая</span>.<br><br>
  <strong>2. FAQ:</strong> Нажмите <span class="btn-like">💡 FAQ</span> для этой инструкции; для возврата к сферам – нажмите вкладку сферы, например <span class="btn-like">❤️ Здоровье (5.0)</span>.<br><br>
  <strong>3. Переключение:</strong> Вкладки вверху позволяют переключаться между сферами жизни.<br><br>
  <strong>4. Оценка:</strong> В каждой сфере есть 3 вопроса. Используйте слайдеры для оценки от 0 до 10.<br><br>
  <strong>5. Визуализация:</strong> Справа отображается колесо баланса, наглядно показывающее ваши оценки.<br><br>
  <strong>6. Среднее:</strong> Для каждой сферы и общее среднее значение рассчитываются автоматически.<br><br>
  <strong>7. Сохранение:</strong> Для сохранения результатов нажмите <span class="btn-like">👤 Login</span>, чтобы войти. После этого используйте кнопку <span class="btn-like">💾</span> для сохранения в облако или <span class="btn-like">☁️</span> для просмотра сохранённых результатов. Кнопка <span class="btn-like">📄 Save</span> позволяет скачать результаты в формате PDF.`,
    
    en: `<strong>Welcome to Mentorist Balance Wheel!</strong><br><br>
  This is a tool for assessing life balance across 8 key areas: Health, Relationships, Environment, Calling, Finance, Self-Improvement, Life Brightness, and Spirituality.<br><br>
  <strong>1. Theme & Language:</strong> Use buttons to change theme and language <span class="btn-like">🌐 EN</span> and <span class="btn-like">🌙 Dark</span> / <span class="btn-like">🌞 Light</span>.<br><br>
  <strong>2. FAQ:</strong> Click <span class="btn-like">💡 FAQ</span> to view this guide; to return to the areas, click an area tab, e.g. <span class="btn-like">❤️ Health (5.0)</span>.<br><br>
  <strong>3. Navigation:</strong> Use the tabs above to switch between life areas.<br><br>
  <strong>4. Assessment:</strong> Each area has 3 questions. Use sliders to rate from 0 to 10.<br><br>
  <strong>5. Visualization:</strong> The balance wheel on the right visually represents your ratings.<br><br>
  <strong>6. Average:</strong> For each area and overall, averages are calculated automatically.<br><br>
  <strong>7. Saving:</strong> To save your results, click <span class="btn-like">👤 Login</span> to sign in. Then use the <span class="btn-like">💾</span> button to save to the cloud or <span class="btn-like">☁️</span> to view saved results. The <span class="btn-like">📄 Save</span> button allows you to download results as PDF.`
  };
  
  













  
  

  function handleFaqClick() {
    const faqContent = document.getElementById("faqContent");
    faqContent.innerHTML = faqInstructions[currentLanguage];
    document.getElementById("sphereTabContent").style.display = "none";
    faqContent.style.display = "block";
  }
  
  // Прикрепляем обработчик к обеим кнопкам FAQ:
  document.getElementById("faqBtnDesktop").addEventListener("click", handleFaqClick);
  document.getElementById("faqBtnMobile").addEventListener("click", handleFaqClick);

  
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
    savePdfBtn.innerText = (currentLanguage === "ru") ? "📄 Скачать" : "📄 Save (PDF)";
  
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


































/****************************************
 * 6. ТЕКУЩАЯ ДАТА И СОХРАНЕНИЕ В JSON/PDF
 ****************************************/



  function initPdfFonts(doc) {
    doc.addFileToVFS("DejaVuSans.ttf", DejaVuSansTTF);
    doc.addFont("DejaVuSans.ttf", "DejaVuSans", "normal");
    doc.setFont("DejaVuSans", "normal");
  }

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
    const monthName = currentLanguage === "ru" ? monthsRu[monthIndex] : monthsEn[monthIndex];
    const dateString = `${monthName} ${day}, ${year}`;
    document.getElementById("currentDate").innerText = `(${dateString})`;
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












const loginBtn = document.getElementById("loginBtn");
const userInfo = document.getElementById("userInfo"); // div, где показываем имя

onAuthStateChanged(auth, (user) => {
  if (user) {
    // Если пользователь вошёл:
    // Если выбран русский язык, меняем на "Выйти", иначе "Logout"
    loginBtn.innerText = currentLanguage === "ru" ? "👤 Выйти" : "👤 Logout";
    // Выводим имя пользователя или email
    userInfo.textContent = user.displayName || user.email || "";
  } else {
    // Пользователь не вошёл
    loginBtn.innerText = currentLanguage === "ru" ? "👤 Войти" : "👤 Login";
    userInfo.textContent = "";
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
  const googleSignInBtn = document.getElementById("googleSignInBtn");
  
  if (currentLanguage === "ru") {
    loginModalLabel.innerText = "Вход";
    modalBodyText.innerText = "Войдите с помощью:";
    googleSignInBtn.innerText = "Войти через Google";
  } else {
    loginModalLabel.innerText = "Login";
    modalBodyText.innerText = "Sign in with:";
    googleSignInBtn.innerText = "Sign in with Google";
  }
  
  // Если у вас есть другие элементы с переводом – обновите и их
}




























});