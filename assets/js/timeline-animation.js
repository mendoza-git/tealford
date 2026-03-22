/**
 * Timeline Animation for About Page
 * Reveals timeline rows with staggered animation on scroll
 */
document.addEventListener("DOMContentLoaded", function() {
  'use strict';

  /* ----------------------------------------------------------
   * Feature Cards — scroll-reveal with staggered entrance
   * ---------------------------------------------------------- */
  const featureCards = document.querySelectorAll('.about-feature-card');

  if (featureCards.length) {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const index = parseInt(card.dataset.cardIndex || 0, 10);
          setTimeout(() => {
            card.classList.add('is-visible');
          }, index * 120);
          cardObserver.unobserve(card);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    featureCards.forEach(card => cardObserver.observe(card));
  }

  /* ----------------------------------------------------------
   * Timeline Rows — scroll-reveal
   * ---------------------------------------------------------- */
  
  const timelineWrapper = document.querySelector('.timeline-wrapper');
  if (!timelineWrapper) return;

  const timelineRows = document.querySelectorAll('.timeline-row');
  const timelineLine = document.querySelector('.timeline-line');
  
  // Initially hide all rows (they start with opacity 0 via CSS)
  timelineRows.forEach(row => {
    row.style.animationPlayState = 'paused';
  });

  // Create intersection observer for the timeline wrapper
  const wrapperObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Start the line animation
        if (timelineLine) {
          timelineLine.classList.add('animate');
        }
        
        // Start row animations with stagger
        timelineRows.forEach((row, index) => {
          setTimeout(() => {
            row.classList.add('is-visible');
            row.style.animationPlayState = 'running';
          }, index * 150);
        });
        
        // Unobserve after animation starts
        wrapperObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Create intersection observer for individual rows (for re-animation on scroll)
  const rowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  });

  // Observe the timeline wrapper
  wrapperObserver.observe(timelineWrapper);
  
  // Observe each row for individual animations
  timelineRows.forEach(row => {
    rowObserver.observe(row);
  });

  // Add hover effects for markers
  timelineRows.forEach(row => {
    const marker = row.querySelector('.timeline-marker');
    const content = row.querySelector('.timeline-content');
    
    if (marker && content) {
      row.addEventListener('mouseenter', () => {
        marker.classList.add('is-active');
      });
      
      row.addEventListener('mouseleave', () => {
        marker.classList.remove('is-active');
      });
    }
  });
});
