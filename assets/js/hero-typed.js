// Hero Typed Animation with Slideshow Synchronization
// Typing animation synchronized with image carousel

(function() {
  'use strict';

  function initTypedAnimation() {
    const typedElement = document.querySelector('.hero__title-typed');
    const slides = document.querySelectorAll('.hero__slide');
    const dots = document.querySelectorAll('.hero__control-dot');
    const heroSection = document.querySelector('.hero');
    
    if (!typedElement || slides.length === 0) return;

    // Get strings from data attribute
    const stringsAttr = typedElement.getAttribute('data-typed-strings');
    if (!stringsAttr) return;

    const strings = stringsAttr.split(',');
    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseEnd = 2000; // Pause after typing
    const pauseStart = 500; // Pause before typing next

    // Function to update slideshow and background based on typed text index
    function updateSlideshow(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('hero__slide--active', i === index);
        
        // Update hero background for mobile/tablet views only
        if (i === index && heroSection) {
          if (window.innerWidth <= 968) {
            const slideImg = slide.querySelector('img');
            if (slideImg) {
              heroSection.style.backgroundImage = `url('${slideImg.src}')`;
            }
          } else {
            // Remove background image on desktop
            heroSection.style.backgroundImage = '';
          }
        }
      });
      
      if (dots.length > 0) {
        dots.forEach((dot, i) => {
          dot.classList.toggle('hero__control-dot--active', i === index);
        });
      }
    }

    function type() {
      const currentString = strings[stringIndex];
      
      if (isDeleting) {
        // Remove character
        typedElement.textContent = currentString.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = deletingSpeed;

        // If fully deleted, move to next string
        if (charIndex === 0) {
          isDeleting = false;
          stringIndex = (stringIndex + 1) % strings.length;
          typingSpeed = pauseStart;
          
          // Update slideshow when moving to next industry
          updateSlideshow(stringIndex);
        }
      } else {
        // Add character
        typedElement.textContent = currentString.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;

        // If fully typed, start deleting after pause
        if (charIndex === currentString.length) {
          isDeleting = true;
          typingSpeed = pauseEnd;
        }
      }

      setTimeout(type, typingSpeed);
    }

    // Add cursor
    typedElement.style.borderRight = '3px solid #0f766e';
    typedElement.style.paddingRight = '5px';
    typedElement.style.animation = 'blink 0.7s step-end infinite';

    // Initialize first slide
    updateSlideshow(0);

    // Start typing
    type();

    // Update background on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateSlideshow(stringIndex);
      }, 250);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTypedAnimation);
  } else {
    initTypedAnimation();
  }
})();
