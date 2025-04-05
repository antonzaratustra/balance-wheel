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

window.showEmojiExplosion = showEmojiExplosion;


// Функция для получения текущего языка из main.js
function getCurrentLanguage() {
    // Проверяем, доступна ли глобальная переменная currentLanguage из main.js
    if (window.currentLanguage) {
        return window.currentLanguage;
    }
    return 'en'; // Возвращаем английский язык по умолчанию, если глобальная переменная недоступна
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
            
            // Добавляем слушатель события изменения языка
            document.addEventListener('languageChanged', (e) => {
                if (e.detail && e.detail.language) {
                    // Обновляем заголовок кнопки таймера
                    const timerButton = document.getElementById('timer-button');
                    if (timerButton) {
                        timerButton.title = e.detail.language === 'ru' ? 'Запустить таймер' : 'Start timer';
                    }
                    
                    // Обновляем атрибут aria-label кнопки закрытия в модальном окне
                    const timerModal = document.getElementById('timerModal');
                    if (timerModal) {
                        const closeButton = timerModal.querySelector('.btn-close');
                        if (closeButton) {
                            closeButton.setAttribute('aria-label', e.detail.language === 'ru' ? 'Закрыть' : 'Close');
                        }
                        
                        // Не обновляем заголовок модального окна, так как там должно отображаться название сферы
                        
                        // Обновляем текст прогресс-бара
                        const progressBarLabel = timerModal.querySelector('.progress-bar-label');
                        if (progressBarLabel) {
                            progressBarLabel.textContent = e.detail.language === 'ru' ? 'Время на вопрос' : 'Time per question';
                        }
                        
                        // Обновляем текст общего таймера
                        const totalTimerLabel = timerModal.querySelector('.total-timer-label');
                        if (totalTimerLabel) {
                            totalTimerLabel.textContent = e.detail.language === 'ru' ? 'Оставшееся время' : 'Remaining time';
                        }
                    }
                    
                    // Обновляем контент в модальном окне при смене языка
                    if (timerModal && timerModal.classList.contains('show')) {
                        showCurrentQuestion();
                        // Обновляем описание слайдера с текущим значением
                        const slider = document.getElementById('timer-slider');
                        if (slider) {
                            const sliderDesc = document.getElementById('timer-slider-desc');
                            const currentSphere = spheres[currentSphereIndex];
                            const question = currentSphere.questions[currentQuestionIndex];
                            if (sliderDesc && question && question.descriptions[slider.value]) {
                                sliderDesc.textContent = question.descriptions[slider.value][window.currentLanguage] || question.descriptions[slider.value]['en'];
                            }
                        }
                    }
                    
                    // Обновляем глобальную переменную языка
                    window.currentLanguage = e.detail.language;
                }
            });
        })
        .catch(error => console.error('Ошибка загрузки модального окна таймера:', error));
});

// Функция для добавления кнопки таймера в центр колеса
function initTimerButton() {
    const canvasWrapper = document.getElementById('balanceWheelContainer');
    
    // Получаем актуальный язык
    const currentLanguage = getCurrentLanguage();
    
    // Создаем кнопку с эмодзи часов
    const timerButton = document.createElement('button');
    timerButton.id = 'timer-button';
    timerButton.innerHTML = '⏱️';
    timerButton.title = currentLanguage === 'ru' ? 'Запустить таймер' : 'Start timer';
    
    // Добавляем кнопку в контейнер колеса
    canvasWrapper.appendChild(timerButton);
    
    // Добавляем обработчик клика для открытия модального окна
    timerButton.addEventListener('click', openTimerModal);
    
    // Инициализируем язык для модального окна
    const timerModal = document.getElementById('timerModal');
    if (timerModal) {
        const modalTitle = timerModal.querySelector('.modal-title');
        const progressBarLabel = timerModal.querySelector('.progress-bar-label');
        const totalTimerLabel = timerModal.querySelector('.total-timer-label');
        
        // Не устанавливаем заголовок модального окна при инициализации, так как он будет установлен в showCurrentQuestion()
        if (progressBarLabel) {
            progressBarLabel.textContent = 'Time per question';
        }
        if (totalTimerLabel) {
            totalTimerLabel.textContent = 'Remaining time';
        }
    }
}

// Функция для открытия модального окна с таймером
function openTimerModal() {
    // Сбрасываем индексы и таймеры
    resetTimers();
    
    // Получаем актуальный язык
    const language = window.currentLanguage || 'en';
    
    // Инициализируем модальное окно
    const timerModal = document.getElementById('timerModal');
    if (timerModal) {
        // Обновляем заголовок кнопки таймера
        const timerButton = document.getElementById('timer-button');
        if (timerButton) {
            timerButton.title = language === 'ru' ? 'Запустить таймер' : 'Start timer';
        }
        
        // Обновляем атрибут aria-label кнопки закрытия
        const closeButton = timerModal.querySelector('.btn-close');
        if (closeButton) {
            closeButton.setAttribute('aria-label', language === 'ru' ? 'Закрыть' : 'Close');
        }
        
        // Показываем модальное окно
        const modal = new bootstrap.Modal(timerModal);
        modal.show();
        
        // Показываем первый вопрос и устанавливаем заголовок с названием сферы
        showCurrentQuestion();
        
        // Запускаем таймеры
        startTimers();
        
        // Добавляем обработчик закрытия модального окна
        timerModal.addEventListener('hidden.bs.modal', () => {
            resetTimers();
        }, { once: true });
    }
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
    
    // Получаем актуальный язык
    const language = window.currentLanguage || 'en';
    
    // Обновляем заголовок модального окна
    const sphereEmoji = document.getElementById('timer-sphere-emoji');
    const sphereTitle = document.getElementById('timer-sphere-title');
    
    if (sphereEmoji && sphereTitle) {
        sphereEmoji.textContent = sphere.emoji;
        sphereTitle.textContent = sphere.title[language] || sphere.title['en'];
    }
    
    // Обновляем вопрос и слайдер
    const questionTitle = document.getElementById('timer-question-title');
    const slider = document.getElementById('timer-slider');
    const sliderDesc = document.getElementById('timer-slider-desc');
    
    if (questionTitle && slider && sliderDesc) {
        questionTitle.textContent = question.title[language] || question.title['en'];
        
        // Устанавливаем цвет слайдера
        slider.style.setProperty('--slider-thumb-color', sphere.color);
        
        // Получаем текущее значение слайдера из основного интерфейса
        const mainSlider = document.getElementById(`slider_${sphere.id}_${question.id}`);
        if (mainSlider) {
            slider.value = mainSlider.value;
        } else {
            slider.value = 5;
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
                // Используем window.updateSliderDisplay для доступа к функции из main.js
                if (typeof window.updateSliderDisplay === 'function') {
                    window.updateSliderDisplay(sphere.id, question.id, this.value);
                }
                // Добавляем явный вызов перерисовки колеса
                if (typeof window.drawWheel === 'function') {
                    window.drawWheel();
                }
            } else {
                // Если основной слайдер не найден, явно вызываем перерисовку колеса
                if (typeof window.drawWheel === 'function') {
                    window.drawWheel();
                }
            }
        };
    }
}

// Функция для обновления описания слайдера
function updateTimerSliderDescription(value) {
    const sliderDesc = document.getElementById('timer-slider-desc');
    const currentSphere = spheres[currentSphereIndex];
    const question = currentSphere.questions[currentQuestionIndex];
    const language = window.currentLanguage || 'en';
    
    if (sliderDesc && question && question.descriptions[value]) {
        sliderDesc.textContent = question.descriptions[value][language] || question.descriptions[value]['en'];
        
        // Обновляем цвет текста в зависимости от значения слайдера
        let val = parseInt(value, 10);
        let fraction = val / 10;
        let r = Math.round(255 * (1 - fraction));
        let g = Math.round(255 * fraction);
        sliderDesc.style.color = `rgb(${r}, ${g}, 0)`;
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
    
    // Перерисовываем колесо баланса при закрытии модального окна
    window.drawWheel();
}

// Функция для отображения анимации взрыва эмодзи
function showEmojiExplosion() {
    const explosionContainer = document.getElementById('emoji-explosion');
    if (!explosionContainer) return;
    
    // Очищаем контейнер
    explosionContainer.innerHTML = '';
    explosionContainer.style.display = 'block';
    
    // Эмодзи для анимации
    const emojis = [
        '🎉', '✨', '🎊', '🌟', '⭐', '💫',
        '🎈', '🎁', '🎈', '🎊', '✨', '💫',
        '🌟', '⭐', '🎈', '🎁', '🎈', '🎊'
    ];
    
    // Создаем частицы эмодзи
    for (let i = 0; i < 1000; i++) {
        const particle = document.createElement('div');
        particle.className = 'emoji-particle';
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Случайное положение и направление
        const x = (Math.random() - 0.5) * window.innerWidth;
        const y = (Math.random() - 0.5) * window.innerHeight;
        particle.style.setProperty('--x', `${x}px`);
        particle.style.setProperty('--y', `${y}px`);
        
        // Случайный размер
        const size = 30 + Math.random() * 20;
        particle.style.fontSize = `${size}px`;
        
        // Случайная задержка
        particle.style.animationDelay = `${Math.random() * 0.2}s`;
        
        // Случайная продолжительность анимации
        // particle.style.animationDuration = `${1 + Math.random() * 2.5}s`;
        
        explosionContainer.appendChild(particle);
    }
    
    // Скрываем анимацию через 3 секунды
    setTimeout(() => {
        explosionContainer.style.display = 'none';
    }, 9000);
}