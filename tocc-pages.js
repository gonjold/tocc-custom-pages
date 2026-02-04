/* ============================================================
   TOCC PAGES — Interactive Components
   Toyota of Coconut Creek
   
   Minimal vanilla JS — no dependencies (jQuery available but 
   not required). Compatible with jQuery 1.12.4 on DI platform.
   ============================================================ */

(function () {
  'use strict';

  /* --- FAQ Accordion --- */
  function initAccordions() {
    var questions = document.querySelectorAll('.tocc-faq__question');
    
    questions.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = this.closest('.tocc-faq__item');
        var isOpen = item.classList.contains('tocc-active');
        
        // Close all siblings in the same FAQ list
        var list = item.closest('.tocc-faq__list');
        if (list) {
          list.querySelectorAll('.tocc-faq__item.tocc-active').forEach(function (openItem) {
            if (openItem !== item) {
              openItem.classList.remove('tocc-active');
            }
          });
        }
        
        // Toggle current
        item.classList.toggle('tocc-active');
      });
    });
  }

  /* --- Tabs --- */
  function initTabs() {
    var tabGroups = document.querySelectorAll('[data-tocc-tabs]');
    
    tabGroups.forEach(function (group) {
      var tabs = group.querySelectorAll('.tocc-tab');
      var targetId = group.getAttribute('data-tocc-tabs');
      var panels = document.querySelectorAll('[data-tocc-tab-panel="' + targetId + '"] .tocc-tab-panel');
      
      tabs.forEach(function (tab, index) {
        tab.addEventListener('click', function () {
          // Deactivate all tabs and panels
          tabs.forEach(function (t) { t.classList.remove('tocc-active'); });
          panels.forEach(function (p) { p.classList.remove('tocc-active'); });
          
          // Activate clicked tab and matching panel
          tab.classList.add('tocc-active');
          if (panels[index]) {
            panels[index].classList.add('tocc-active');
          }
        });
      });
    });
  }

  /* --- Smooth Scroll for anchor links --- */
  function initSmoothScroll() {
    document.querySelectorAll('.tocc-page a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var offset = 100; // Account for DI sticky header
          var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          
          window.scrollTo({
            top: top,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /* --- Animate on scroll (simple fade-in) --- */
  function initScrollReveal() {
    var reveals = document.querySelectorAll('.tocc-reveal');
    if (!reveals.length) return;
    
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('tocc-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });
    
    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* --- Phone number click tracking (basic) --- */
  function initPhoneTracking() {
    document.querySelectorAll('.tocc-page a[href^="tel:"]').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'tocc_phone_click',
            phone_number: this.getAttribute('href').replace('tel:', '')
          });
        }
      });
    });
  }

  /* --- Initialize everything when DOM is ready --- */
  function init() {
    initAccordions();
    initTabs();
    initSmoothScroll();
    initScrollReveal();
    initPhoneTracking();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
