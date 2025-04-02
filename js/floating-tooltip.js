// Модуль для отображения плавающей подсказки при наведении на колесо баланса
import { tooltips } from './tooltips.js';

// Глобальные переменные
let floatingTooltip;
let currentLanguage = 'en';
let lastSphereId = null;
let tooltipChangeCounter = 0;
let tooltipChangeThreshold = 5; // Менять подсказку каждые 5 пикселей движения

// Инициализация модуля
export function initFloatingTooltip() {
  // Создаем элемент подсказки
  floatingTooltip = document.createElement('div');
  floatingTooltip.id = 'floatingTooltip';
  floatingTooltip.style.display = 'none';
  document.body.appendChild(floatingTooltip);

  // Получаем текущий язык
  if (window.currentLanguage) {
    currentLanguage = window.currentLanguage;
  }

  // Добавляем слушатель события изменения языка
  document.addEventListener('languageChanged', (e) => {
    if (e.detail && e.detail.language) {
      currentLanguage = e.detail.language;
    }
  });

  // Добавляем стили для подсказки
  addFloatingTooltipStyles();

  // Получаем canvas и добавляем обработчики событий
  const canvas = document.getElementById('balanceWheel');
  if (canvas) {
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
  }
}

// Добавление стилей для плавающей подсказки
function addFloatingTooltipStyles() {
  const style = document.createElement('style');
  style.textContent = `
    #floatingTooltip {
      position: absolute;
      pointer-events: none;
      padding: 8px 12px;
      border-radius: 50%;
      font-size: 0.85rem;
      line-height: 1.2em;
      z-index: 99999;
      width: 120px;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.7);
      transition: all 0.2s ease-out;
      opacity: 0.9;
      transform: scale(1);
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
      }
      70% {
        transform: scale(1);
        box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
      }
      100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
      }
    }
    
    @media (max-width: 768px) {
      #floatingTooltip {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(style);
}

// Обработчик движения мыши
function handleMouseMove(e) {
  const canvas = e.target;
  const canvasRect = canvas.getBoundingClientRect();
  
  // Получаем координаты курсора относительно центра канваса
  const centerX = canvasRect.width / 2;
  const centerY = canvasRect.height / 2;
  const mouseX = e.clientX - canvasRect.left;
  const mouseY = e.clientY - canvasRect.top;
  
  // Вычисляем угол и расстояние от центра
  const dx = mouseX - centerX;
  const dy = mouseY - centerY;
  const angle = Math.atan2(dy, dx);
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Определяем сектор под курсором
  const hoveredSector = getSectorUnderCursor(mouseX, mouseY);
  
  if (hoveredSector) {
    // Увеличиваем счетчик движения для смены подсказки
    tooltipChangeCounter++;
    
    // Если сектор изменился или прошло достаточно движения, обновляем подсказку
    if (lastSphereId !== hoveredSector.sphereId || tooltipChangeCounter >= tooltipChangeThreshold) {
      lastSphereId = hoveredSector.sphereId;
      tooltipChangeCounter = 0;
      updateTooltip(hoveredSector);
    }
    
    // Вычисляем позицию для подсказки (противоположная сторона от курсора)
    const oppositeAngle = angle + Math.PI;
    const tooltipDistance = distance + 100; // Немного дальше от центра, чем курсор
    
    // Вычисляем координаты подсказки
    const tooltipX = centerX + Math.cos(oppositeAngle) * tooltipDistance;
    const tooltipY = centerY + Math.sin(oppositeAngle) * tooltipDistance;
    
    // Позиционируем подсказку
    floatingTooltip.style.left = (canvasRect.left + tooltipX - floatingTooltip.offsetWidth / 2) + 'px';
    floatingTooltip.style.top = (canvasRect.top + tooltipY - floatingTooltip.offsetHeight / 2) + 'px';
    floatingTooltip.style.display = 'flex';
  } else {
    // Если курсор не над сектором, скрываем подсказку
    floatingTooltip.style.display = 'none';
  }
}

// Обработчик ухода мыши с канваса
function handleMouseLeave() {
  floatingTooltip.style.display = 'none';
  lastSphereId = null;
}

// Обновление содержимого и стиля подсказки
function updateTooltip(sector) {
  const sphereId = sector.sphereId;
  const sphereObj = sector.sphereObj;
  
  // Получаем случайную подсказку для данной сферы
  const sphereTooltips = tooltips[currentLanguage][sphereId];
  const randomIndex = Math.floor(Math.random() * sphereTooltips.length);
  const tooltipText = sphereTooltips[randomIndex];
  
  // Устанавливаем текст подсказки
  floatingTooltip.textContent = tooltipText;
  
  // Устанавливаем цвет фона подсказки в соответствии с цветом сферы
  floatingTooltip.style.backgroundColor = sphereObj.color;
  
  // Определяем цвет текста в зависимости от яркости фона
  const isDarkTheme = document.body.classList.contains('dark-mode');
  const textColor = isDarkTheme ? '#ffffff' : '#333333';
  floatingTooltip.style.color = textColor;
}

// Функция для получения сектора под курсором (используем существующую функцию из main.js)
function getSectorUnderCursor(mouseX, mouseY) {
  // Эта функция должна быть доступна глобально из main.js
  if (window.getSectorUnderCursor) {
    return window.getSectorUnderCursor(mouseX, mouseY);
  }
  
  // Если функция недоступна, используем собственную реализацию
  const canvas = document.getElementById('balanceWheel');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const dx = mouseX - centerX;
  const dy = mouseY - centerY;
  const r = Math.sqrt(dx * dx + dy * dy);
  
  let angle = Math.atan2(dy, dx);
  if (angle < 0) {
    angle += 2 * Math.PI;
  }
  
  // Получаем секторы из глобальной переменной
  const wheelSectors = window.wheelSectors || [];
  
  for (let sector of wheelSectors) {
    let startAngle = sector.startAngle;
    let endAngle = sector.endAngle;
    if (startAngle < 0) startAngle += 2 * Math.PI;
    if (endAngle < 0) endAngle += 2 * Math.PI;
    
    // Проверяем, попадает ли угол в сектор
    if (isAngleInArc(angle, startAngle, endAngle)) {
      // И проверяем радиус
      if (r <= sector.radius) {
        return sector;
      }
    }
  }
  return null;
}

// Вспомогательная функция для проверки, попадает ли угол в дугу
function isAngleInArc(angle, start, end) {
  if (start <= end) {
    return angle >= start && angle <= end;
  } else {
    // Если дуга "переваливает" через 2π
    return (angle >= start && angle < 2 * Math.PI) || (angle >= 0 && angle <= end);
  }
}