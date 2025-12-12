document.addEventListener("DOMContentLoaded", function() {
  'use strict';

    const html = document.querySelector('html'),
    menuToggle = document.querySelector(".hamburger"),
    menuList = document.querySelector(".main-nav"),
    toggleTheme = document.querySelector(".toggle-theme"),
    splides = document.querySelector(".hero__logos"),
    featuredSlider = document.querySelector(".featured__slider__inner"),
    testimonialsSlider = document.querySelector(".testimonials__slider");


  /* =======================================================
  // Menu + Theme Switcher
  ======================================================= */
  menuToggle.addEventListener("click", () => {
    menu();
  });

  // Menu
  function menu() {
    menuToggle.classList.toggle("is-open");
    menuList.classList.toggle("is-visible");
    document.body.classList.toggle("menu-open");
  }

  // Mobile accordion menu for dropdowns
  const mobileDropdowns = document.querySelectorAll('.nav__item.dropdown');
  
  mobileDropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    
    if (toggle) {
      toggle.addEventListener('click', (e) => {
        // Only handle on mobile
        if (window.innerWidth <= 1024) {
          e.preventDefault();
          e.stopPropagation();
          
          // Close other dropdowns
          mobileDropdowns.forEach(otherDropdown => {
            if (otherDropdown !== dropdown) {
              otherDropdown.classList.remove('is-active');
            }
          });
          
          // Toggle current dropdown
          dropdown.classList.toggle('is-active');
        }
      });
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024 && 
        menuList.classList.contains('is-visible') && 
        !menuList.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      menu();
    }
  });

  // Theme Switcher
  if (toggleTheme) {
    toggleTheme.addEventListener("click", () => {
      darkMode();
    });
  };

  function darkMode() {
    if (html.classList.contains('dark-mode')) {
      html.classList.remove('dark-mode');
      localStorage.removeItem("theme");
      document.documentElement.removeAttribute("dark");
    } else {
      html.classList.add('dark-mode');
      localStorage.setItem("theme", "dark");
      document.documentElement.setAttribute("dark", "");
    }
  };


  /* ============================
  // Logos Slider
  ============================ */
  if (splides) {
    new Splide( splides, {
      direction: 'ltr',
      clones: 9,
      gap: 16,
      autoWidth: true,
      drag: false,
      arrows: false,
      pagination: false,
      type: 'loop',
      autoScroll: {
        autoStart: true,
        speed: 0.4,
        pauseOnHover: false,
        pauseOnFocus: false
      }
    } ).mount(window.splide.Extensions );
  }


  /* ============================
  // Featured Slider
  ============================ */
  if (featuredSlider) {
    new Splide( featuredSlider, {
      perPage: 3,
      perMove: 1,
      gap: 32,
      pagination: false,
      breakpoints: {
        1024: {
          perPage: 2
        },
        768: {
          perPage: 1
        }
      }
    } ).mount();
  }


  /* ============================
  // Testimonials Slider
  ============================ */
  if (testimonialsSlider) {
    new Splide( testimonialsSlider, {
      perPage: 3,
      perMove: 1,
      gap: 32,
      arrows: false,
      drag: false,
      pagination: false,
      type: 'loop',
      autoScroll: {
        autoStart: true,
        speed: 0.8,
        pauseOnHover: false,
        pauseOnFocus: false
      },
      breakpoints: {
        1024: {
          perPage: 2
        },
        768: {
          perPage: 1
        }
      }
    } ).mount(window.splide.Extensions);
  }


  /* ================================================================
  // Stop Animations During Window Resizing and Switching Theme Modes
  ================================================================ */
  let disableTransition;

  if (toggleTheme) {
    toggleTheme.addEventListener("click", () => {
      stopAnimation();
    });
  }

  window.addEventListener("resize", () => {
    stopAnimation();
  });

  function stopAnimation() {
    document.body.classList.add("disable-animation");
    clearTimeout(disableTransition);
    disableTransition = setTimeout(() => {
      document.body.classList.remove("disable-animation");
    }, 100);
  };


  /* =======================
  // Responsive Videos
  ======================= */
  reframe(".post__content iframe:not(.reframe-off), .page__content iframe:not(.reframe-off)");


  /* =======================
  // LazyLoad Images
  ======================= */
  var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
  })


  /* =======================
  // Zoom Image
  ======================= */
  const lightense = document.querySelector(".page__content img, .post__content img, .project-content img, .gallery__image img"),
  imageLink = document.querySelectorAll(".page__content a img, .post__content a img, .project-content a img, .gallery__image a img");

  if (imageLink) {
    for (var i = 0; i < imageLink.length; i++) imageLink[i].parentNode.classList.add("image-link");
    for (var i = 0; i < imageLink.length; i++) imageLink[i].classList.add("no-lightense");
  }

  if (lightense) {
    Lightense(".page__content img:not(.no-lightense), .post__content img:not(.no-lightense), .project-content img:not(.no-lightense), .gallery__image img:not(.no-lightense)", {
      padding: 60,
      offset: 30
    });
  }


  // =====================
  // Load More Posts
  // =====================
  var load_posts_button = document.querySelector('.load-more-posts');

  load_posts_button&&load_posts_button.addEventListener("click",function(e){e.preventDefault();var o=document.querySelector(".pagination"),e=pagination_next_url.split("/page")[0]+"/page/"+pagination_next_page_number+"/";fetch(e).then(function(e){if(e.ok)return e.text()}).then(function(e){var n=document.createElement("div");n.innerHTML=e;for(var t=document.querySelector(".grid"),a=n.querySelectorAll(".article__grid"),i=0;i<a.length;i++)t.appendChild(a.item(i));new LazyLoad({elements_selector:".lazy"});pagination_next_page_number++,pagination_next_page_number>pagination_available_pages_number&&(o.style.display="none")})});


  /* =================================
  // Accordion
  ================================= */
  const items = document.querySelectorAll(".faq .faq__item");

  function toggleAccordion() {
    const itemToggle = this.getAttribute('data-name');

    if (itemToggle === 'closed') {
      this.setAttribute('data-name', 'open');
    } else {
      this.setAttribute('data-name', 'closed');
    }
  }

  items.forEach(item => {
    item.addEventListener('click', toggleAccordion);
    item.addEventListener('keydown', function(event) {
      if (event.keyCode === 13) {
        toggleAccordion.call(this);
      }
    });
  });


  /* =================================
  // Mega Menu - Close on Click Outside
  ================================= */
  const megaMenus = document.querySelectorAll('.mega-menu');
  
  megaMenus.forEach(menu => {
    const dropdown = menu.querySelector('.mega-menu-dropdown');
    
    // Close mega menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideMenu = menu.contains(event.target);
      
      if (!isClickInsideMenu && dropdown) {
        // Remove hover state by temporarily removing pointer events
        menu.style.pointerEvents = 'none';
        setTimeout(() => {
          menu.style.pointerEvents = '';
        }, 10);
      }
    });
  });

});