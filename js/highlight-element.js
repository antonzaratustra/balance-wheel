// Function to highlight elements in FAQ with overlay and tooltip
export function highlightElement(element, tooltipText, needsScroll = false, topOffset = null) {
  // Remove any existing overlay and tooltip
  const existingOverlay = document.getElementById('faqOverlay');
  const existingTooltip = document.getElementById('faqTooltip');
  if (existingOverlay) existingOverlay.remove();
  if (existingTooltip) existingTooltip.remove();

  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'faqOverlay';
  document.body.appendChild(overlay);

  // Create tooltip
  const tooltip = document.createElement('div');
  tooltip.id = 'faqTooltip';
  tooltip.textContent = tooltipText;
  tooltip.style.backgroundColor = document.body.classList.contains('dark-mode') ? '#333' : '#fff';
  tooltip.style.color = document.body.classList.contains('dark-mode') ? '#fff' : '#333';
  element.appendChild(tooltip);

  // Add pulsing effect to the element
  element.classList.add('pulsing');

  // Scroll into view if needed
  if (needsScroll) {
    const yOffset = topOffset ? -window.innerHeight * parseFloat(topOffset) / 100 : -100;
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  // Remove highlighting after animation
  setTimeout(() => {
    overlay.remove();
    tooltip.remove();
    element.classList.remove('pulsing');
  }, 2000);
}