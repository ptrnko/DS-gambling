'use strict';

/* =============================================================
   BURGER MENU (mobile)
============================================================= */
function initBurger() {
  const burger  = document.querySelector('.burger');
  const overlay = document.querySelector('.menu-overlay');
  if (!burger || !overlay) return;

  function open() {
    burger.classList.add('is-open');
    overlay.style.display = 'flex';
    requestAnimationFrame(() => overlay.classList.add('is-open'));
    document.body.style.overflow = 'hidden';
  }

  function close() {
    burger.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    overlay.addEventListener('transitionend', function handler() {
      overlay.style.display = 'none';
      overlay.removeEventListener('transitionend', handler);
    });
  }

  burger.addEventListener('click', () =>
    burger.classList.contains('is-open') ? close() : open()
  );

  document.querySelector('.menu-overlay__close')
    ?.addEventListener('click', close);

  document.querySelectorAll('.menu-link')
    .forEach(a => a.addEventListener('click', close));
}

/* =============================================================
   SCROLL-REVEAL (mobile)
============================================================= */
function initScrollReveal() {
  const els = document.querySelectorAll('[data-reveal], .reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });
  els.forEach(el => obs.observe(el));
}

/* =============================================================
   INIT
============================================================= */
document.addEventListener('DOMContentLoaded', () => {
  initBurger();
  initScrollReveal();

  document.querySelectorAll('.work-card[data-href]').forEach((card) => {
    card.addEventListener('click', () => {
      window.location.href = card.dataset.href;
    });
  });
});
