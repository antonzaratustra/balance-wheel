// Функционал таймера для колеса баланса

// Импортируем сферы из файла spheres.js
import { spheres } from './js/spheres.js';

// Глобальные переменные для таймера
let timerInterval;
let questionInterval;
let totalTimerInterval;
let currentSphereIndex = 0;
let currentQuestionIndex = 0;
let totalTimeLeft = 10 * 60; // 10 минут в секундах
let questionTimeLeft = 15; // 15 секунд на вопрос
let currentLanguage = 'en'; // Язык по умолчанию

// Функция для получения текущего языка из main.js
function getCurrentLanguage() {
    // Проверяем, доступна ли глобальная переменная currentLanguage из main.js
    if (window.currentLanguage) {
        return window.currentLanguage;
    }
    return currentLanguage; // Возвращаем локальную переменную, если глобальная недоступна
}

// Инициализация таймера
document.addEventListener("DOMContentLoaded", () => {
    // Добавляем стили для таймера
    const timerStylesheet = document.createElement('link');
    timerStylesheet.rel = 'stylesheet';
    timerStylesheet.href = 'timer-styles.css';
    document.head.appendChild(timerStylesheet);

    // Загружаем HTML модального окна
    fetch('timer-modal.html')
        .then(response => response.text())
        .then(html => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            document.body.appendChild(tempDiv.firstElementChild);
            document.body.appendChild(tempDiv.lastElementChild);
            
            // Инициализируем кнопку таймера в центре колеса
            initTimerButton();
            
            // Получаем текущий язык из main.js
            if (window.currentLanguage) {
                currentLanguage = window.currentLanguage;
            }
            
            // Добавляем слушатель события изменения языка
            document.addEventListener('languageChanged', (e) => {
                if (e.detail && e.detail.language) {
                    currentLanguage = e.detail.language;
                    
                    // Обновляем заголовок кнопки таймера
                    const timerButton = document.getElementById('timer-button');
                    if (timerButton) {
                        timerButton.title = currentLanguage === 'ru' ? 'Запустить таймер' : 'Start timer';
                    }
                    
                    // Обновляем контент в модальном окне при смене языка
                    const timerModal = document.getElementById('timerModal');
                    if (timerModal && timerModal.classList.contains('show')) {
                        showCurrentQuestion();
                        // Обновляем описание слайдера с текущим значением
                        const slider = document.getElementById('timer-slider');
                        if (slider) {
                            const sliderDesc = document.getElementById('timer-slider-desc');
                            const currentSphere = spheres[currentSphereIndex];
                            const question = currentSphere.questions[currentQuestionIndex];
                            if (sliderDesc && question && question.descriptions[slider.value]) {
                                sliderDesc.textContent = question.descriptions[slider.value][currentLanguage];
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Ошибка загрузки модального окна таймера:', error));
});

// Функция для добавления кнопки таймера в центр колеса
function initTimerButton() {
    const canvasWrapper = document.getElementById('balanceWheelContainer');
    
    // Получаем актуальный язык
    currentLanguage = getCurrentLanguage();
    
    // Создаем кнопку с эмодзи часов
    const timerButton = document.createElement('button');
    timerButton.id = 'timer-button';
    timerButton.innerHTML = '⏱️';
    timerButton.title = currentLanguage === 'ru' ? 'Запустить таймер' : 'Start timer';
    
    // Добавляем кнопку в контейнер колеса
    canvasWrapper.appendChild(timerButton);
    
    // Добавляем обработчик клика для открытия модального окна
    timerButton.addEventListener('click', openTimerModal);
}

// Функция для открытия модального окна с таймером
function openTimerModal() {
    // Сбрасываем индексы и таймеры
    resetTimers();
    
    // Получаем актуальный язык перед открытием модального окна
    currentLanguage = getCurrentLanguage();
    
    // Получаем модальное окно
    const timerModal = document.getElementById('timerModal');
    const modal = new bootstrap.Modal(timerModal);
    
    // Показываем первый вопрос
    showCurrentQuestion();
    
    // Запускаем таймеры
    startTimers();
    
    // Открываем модальное окно
    modal.show();
    
    // Добавляем обработчик закрытия модального окна
    timerModal.addEventListener('hidden.bs.modal', () => {
        resetTimers();
    }, { once: true });
}

// Функция для сброса таймеров
function resetTimers() {
    // Очищаем все интервалы
    clearInterval(timerInterval);
    clearInterval(questionInterval);
    clearInterval(totalTimerInterval);
    
    // Сбрасываем индексы и таймеры
    currentSphereIndex = 0;
    currentQuestionIndex = 0;
    totalTimeLeft = 10 * 60; // 10 минут
    questionTimeLeft = 15; // 15 секунд
    
    // Сбрасываем прогресс-бар
    const progressBar = document.getElementById('timer-progress-bar');
    if (progressBar) {
        progressBar.style.width = '100%';
    }
    
    // Сбрасываем отображение общего таймера
    const totalTimerDisplay = document.getElementById('total-timer-display');
    if (totalTimerDisplay) {
        totalTimerDisplay.textContent = '10:00';
    }
}

// Функция для запуска таймеров
function startTimers() {
    // Запускаем таймер для текущего вопроса
    startQuestionTimer();
    
    // Запускаем общий таймер на 10 минут
    startTotalTimer();
}

// Функция для запуска таймера вопроса (15 секунд)
function startQuestionTimer() {
    questionTimeLeft = 15;
    const progressBar = document.getElementById('timer-progress-bar');
    const currentSphere = spheres[currentSphereIndex];
    
    // Устанавливаем цвет прогресс-бара в соответствии с цветом текущей сферы
    if (progressBar && currentSphere) {
        progressBar.style.backgroundColor = currentSphere.color;
        progressBar.style.width = '100%';
    }
    
    // Запускаем интервал для обновления прогресс-бара
    questionInterval = setInterval(() => {
        questionTimeLeft--;
        
        // Обновляем прогресс-бар
        if (progressBar) {
            const percentage = (questionTimeLeft / 15) * 100;
            progressBar.style.width = `${percentage}%`;
        }
        
        // Если время вышло, переходим к следующему вопросу
        if (questionTimeLeft <= 0) {
            clearInterval(questionInterval);
            moveToNextQuestion();
        }
    }, 1000);
}

// Функция для запуска общего таймера (10 минут)
function startTotalTimer() {
    const totalTimerDisplay = document.getElementById('total-timer-display');
    
    totalTimerInterval = setInterval(() => {
        totalTimeLeft--;
        
        // Обновляем отображение таймера
        if (totalTimerDisplay) {
            const minutes = Math.floor(totalTimeLeft / 60);
            const seconds = totalTimeLeft % 60;
            totalTimerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
        
        // Если общее время вышло, закрываем модальное окно
        if (totalTimeLeft <= 0) {
            clearInterval(totalTimerInterval);
            closeTimerModal();
        }
    }, 1000);
}

// Функция для отображения текущего вопроса
function showCurrentQuestion() {
    if (currentSphereIndex >= spheres.length) {
        // Если все сферы пройдены, закрываем модальное окно и показываем анимацию
        closeTimerModal();
        showEmojiExplosion();
        return;
    }
    
    const currentSphere = spheres[currentSphereIndex];
    
    if (currentQuestionIndex >= currentSphere.questions.length) {
        // Если все вопросы текущей сферы пройдены, переходим к следующей сфере
        currentSphereIndex++;
        currentQuestionIndex = 0;
        
        // Проверяем, не закончились ли все сферы
        if (currentSphereIndex >= spheres.length) {
            closeTimerModal();
            showEmojiExplosion();
            return;
        }
        
        // Обновляем текущую сферу
        showCurrentQuestion();
        return;
    }
    
    // Получаем текущую сферу и вопрос
    const sphere = spheres[currentSphereIndex];
    const question = sphere.questions[currentQuestionIndex];
    
    // Обновляем заголовок модального окна
    const sphereEmoji = document.getElementById('timer-sphere-emoji');
    const sphereTitle = document.getElementById('timer-sphere-title');
    
    if (sphereEmoji && sphereTitle) {
        sphereEmoji.textContent = sphere.emoji;
        sphereTitle.textContent = sphere.title[currentLanguage];
    }
    
    // Обновляем вопрос и слайдер
    const questionTitle = document.getElementById('timer-question-title');
    const slider = document.getElementById('timer-slider');
    const sliderDesc = document.getElementById('timer-slider-desc');
    
    if (questionTitle && slider && sliderDesc) {
        questionTitle.textContent = question.title[currentLanguage];
        
        // Устанавливаем цвет слайдера
        slider.style.setProperty('--slider-thumb-color', sphere.color);
        
        // Получаем текущее значение слайдера из основного интерфейса
        const mainSlider = document.getElementById(`slider_${sphere.id}_${question.id}`);
        if (mainSlider) {
            slider.value = mainSlider.value;
        } else {
            slider.value = 5; // Значение по умолчанию
        }
        
        // Обновляем описание слайдера
        updateTimerSliderDescription(slider.value);
        
        // Добавляем обработчик изменения слайдера
        slider.oninput = function() {
            updateTimerSliderDescription(this.value);
            
            // Синхронизируем значение с основным слайдером
            const mainSlider = document.getElementById(`slider_${sphere.id}_${question.id}`);
            if (mainSlider) {
                mainSlider.value = this.value;
                // Вызываем функцию обновления основного слайдера
                updateSliderDisplay(sphere.id, question.id, this.value);
            }
        };
    }
    
    // Функция для обновления описания слайдера
    function updateTimerSliderDescription(value) {
        if (sliderDesc && question && question.descriptions[value]) {
            // Используем текущий язык для отображения описания
            sliderDesc.textContent = question.descriptions[value][currentLanguage];
            
            // Обновляем цвет текста в зависимости от значения слайдера
            let val = parseInt(value, 10);
            let fraction = val / 10;
            let r = Math.round(255 * (1 - fraction));
            let g = Math.round(255 * fraction);
            sliderDesc.style.color = `rgb(${r}, ${g}, 0)`;
        }
    }
}

// Функция для перехода к следующему вопросу
function moveToNextQuestion() {
    currentQuestionIndex++;
    showCurrentQuestion();
    startQuestionTimer();
}

// Функция для закрытия модального окна
function closeTimerModal() {
    const timerModal = document.getElementById('timerModal');
    const modal = bootstrap.Modal.getInstance(timerModal);
    
    if (modal) {
        modal.hide();
    }
    
    resetTimers();
}

// Функция для отображения анимации взрыва эмодзи
function showEmojiExplosion() {
    const explosionContainer = document.getElementById('emoji-explosion');
    if (!explosionContainer) return;
    
    // Очищаем контейнер
    explosionContainer.innerHTML = '';
    explosionContainer.style.display = 'block';
    
    // Эмодзи для анимации (используем эмодзи из всех сфер)
    const emojis = spheres.map(sphere => sphere.emoji);
    emojis.push('🎉', '✨', '🎊', '🌟', '⭐', '💫');
    
    // Создаем частицы эмодзи
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'emoji-particle';
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Случайное положение и направление
        const x = (Math.random() - 0.5) * window.innerWidth;
        const y = (Math.random() - 0.5) * window.innerHeight;
        particle.style.setProperty('--x', `${x}px`);
        particle.style.setProperty('--y', `${y}px`);
        
        // Случайная задержка
        particle.style.animationDelay = `${Math.random() * 0.5}s`;
        
        explosionContainer.appendChild(particle);
    }
    
    // Скрываем анимацию через 3 секунды
    setTimeout(() => {
        explosionContainer.style.display = 'none';
    }, 3000);
}