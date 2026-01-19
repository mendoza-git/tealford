// Hero Image Slideshow - Manual Control Only
// Auto-play is handled by hero-typed.js for synchronization
(function() {
  'use strict';

  const initHeroSlideshow = () => {
    const slideshow = document.querySelector('.hero__slideshow');
    if (!slideshow) return;

    const slides = document.querySelectorAll('.hero__slide');
    const dots = document.querySelectorAll('.hero__control-dot');
    
    if (slides.length === 0) return;

    let currentSlide = 0;

    // Change to specific slide
    const goToSlide = (index) => {
      // Remove active class from all
      slides.forEach(slide => slide.classList.remove('hero__slide--active'));
      dots.forEach(dot => dot.classList.remove('hero__control-dot--active'));

      // Add active class to current
      slides[index].classList.add('hero__slide--active');
      dots[index].classList.add('hero__control-dot--active');
      
      currentSlide = index;
    };

    // Add click handlers to dots (optional manual control)
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
        // Note: This may temporarily desync from typed text
        // They will resync on next typing cycle
      });
    });

    // Initialize first slide (backup - hero-typed.js should handle this)
    goToSlide(0);
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroSlideshow);
  } else {
    initHeroSlideshow();
  }
})();
