// Function to highlight elements in FAQ with overlay and tooltip
export function highlightElement(element, tooltipText, needsScroll = false, topOffset = null) {
  // Проверяем, находится ли элемент в FAQ
  const isInFaq = document.getElementById('faqContent')?.contains(element) || false;
  
  // Проверяем, является ли элемент кнопкой Health или Timer
  const isHealthButton = element.textContent && (element.textContent.includes('❤️ Health') || element.textContent.includes('❤️ Здоровье'));
  const isTimerButton = element.textContent && element.textContent.includes('⏱️');
  
  // Находим соответствующие элементы для подсветки
  if (isHealthButton || (isInFaq && element.innerHTML && (element.innerHTML.includes('❤️ Health') || element.innerHTML.includes('❤️ Здоровье')))) {
    const sphereTabs = document.getElementById('sphereTabs');
    if (sphereTabs) element = sphereTabs;
  } else if (isTimerButton || (isInFaq && element.innerHTML && element.innerHTML.includes('⏱️'))) {
    const timerButton = document.getElementById('timer-button');
    if (timerButton) element = timerButton;
  }

  // Clean up any existing overlays and tooltips
  const cleanup = () => {
    // Remove all existing overlays and tooltips (including those with timestamp IDs)
    const existingOverlays = document.querySelectorAll('[id^="faqOverlay"]');
    const existingTooltips = document.querySelectorAll('[id^="faqTooltip"]');
    
    existingOverlays.forEach(overlay => {
      overlay.remove();
    });
    
    existingTooltips.forEach(tooltip => {
      tooltip.remove();
    });

    // Reset z-index for all elements that might have been previously highlighted
    document.querySelectorAll('.pulsing').forEach(el => {
      el.classList.remove('pulsing');
      el.style.position = '';
      el.style.zIndex = '';
    });

    // Reset z-index for all elements
    document.querySelectorAll('*').forEach(el => {
      if (el.style.zIndex >= 1000) {
        el.style.zIndex = '';
      }
    });
  };

  // Clean up existing elements first
  cleanup();

  // Store original styles
  const originalStyles = {
    position: window.getComputedStyle(element).position,
    zIndex: window.getComputedStyle(element).zIndex || 'auto'
  };

  // Ensure all other elements are below the overlay
  document.querySelectorAll('*').forEach(el => {
    if (el !== element && el.style.zIndex >= 1000) {
      el.style.zIndex = '999';
    }
  });

  // Create overlay with unique ID
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

  // Add event listeners to prevent overlay from interfering with element interactions
  overlay.addEventListener('mouseover', (e) => {
    const elementRect = element.getBoundingClientRect();
    if (e.clientX >= elementRect.left && e.clientX <= elementRect.right &&
        e.clientY >= elementRect.top && e.clientY <= elementRect.bottom) {
      overlay.style.pointerEvents = 'none';
    } else {
      overlay.style.pointerEvents = 'auto';
    }
  });

  overlay.addEventListener('click', cleanup);

  // Set element's position and z-index
  element.style.position = originalStyles.position === 'static' ? 'relative' : originalStyles.position;
  element.style.zIndex = '1001';

  // Create tooltip if text is provided
  if (tooltipText) {
    const tooltip = document.createElement('div');
    tooltip.id = 'faqTooltip-' + Date.now();
    tooltip.textContent = tooltipText;

    // Get random color from spheres palette
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
    const randomColor = sphereColors[Math.floor(Math.random() * sphereColors.length)];
    
    tooltip.style.backgroundColor = randomColor;
    tooltip.style.color = '#fff';
    tooltip.style.padding = '8px 12px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.position = 'absolute';
    tooltip.style.left = '50%';
    tooltip.style.transform = 'translateX(-50%)';
    tooltip.style.zIndex = '1002';
    tooltip.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.whiteSpace = 'nowrap';
    
    // Add tooltip to body
    document.body.appendChild(tooltip);

    // Позиционируем тултип относительно элемента
    const elementRect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    // Устанавливаем позицию тултипа под элементом
    if (window.innerWidth <= 576 && needsScroll) {
      // На мобильных устройствах добавляем слушатель события прокрутки
      const updateTooltipPosition = () => {
        const updatedRect = element.getBoundingClientRect();
        tooltip.style.top = `${updatedRect.bottom + window.scrollY + 10}px`;
        tooltip.style.left = `${updatedRect.left + (updatedRect.width - tooltipRect.width) / 2}px`;
      };
      
      window.addEventListener('scroll', updateTooltipPosition);
      setTimeout(() => {
        window.removeEventListener('scroll', updateTooltipPosition);
      }, 2000);
    }
    tooltip.style.top = `${elementRect.bottom + window.scrollY + 10}px`;
    tooltip.style.left = `${elementRect.left + (elementRect.width - tooltipRect.width) / 2}px`;
    tooltip.style.transform = 'none';
  }

  // Add pulsing effect to the element
  element.classList.add('pulsing');

  // Scroll into view if needed
  if (needsScroll) {
    const yOffset = topOffset ? -window.innerHeight * parseFloat(topOffset) / 100 : -100;
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  // Restore original styles and cleanup after animation
  const restoreAndCleanup = () => {
    cleanup();
    element.classList.remove('pulsing');
    element.style.position = originalStyles.position;
    element.style.zIndex = originalStyles.zIndex;
  };

  setTimeout(restoreAndCleanup, 2000);
}