(function () {
  'use strict';

  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav__link');
  const fadeElements = document.querySelectorAll('.fade-in');

  /* Header scroll effect */
  function handleScroll() {
    if (window.scrollY > 20) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* Mobile menu toggle */
  menuToggle.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('open');
    menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  /* Close menu on link click */
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* Active nav link on scroll */
  const sections = document.querySelectorAll('section[id]');

  function highlightNav() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

  /* Intersection Observer for fade-in animations */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* Smooth scroll for anchor links (fallback for browsers without CSS scroll-behavior) */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
