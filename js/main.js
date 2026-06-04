/* ============================================
   MAIN.JS — HOREB VISION PUB
   JavaScript principal du site
   ============================================ */

// ── On attend que la page soit complètement chargée ──
document.addEventListener('DOMContentLoaded', () => {

  // ══════════════════════════════════════════
  // 1. NAVBAR — Effet au scroll
  // ══════════════════════════════════════════
  const navbar = document.querySelector('.navbar');

  if (navbar) {
    window.addEventListener('scroll', () => {
      // Si on a scrollé plus de 20px, on ajoute la classe "scrolled"
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ══════════════════════════════════════════
  // 2. MENU BURGER — Ouverture/fermeture mobile
  // ══════════════════════════════════════════
  const burger = document.querySelector('.navbar-burger');
  const mobileMenu = document.querySelector('.navbar-mobile');

  if (burger && mobileMenu) {

    // Clic sur le burger
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    // Fermer le menu si on clique sur un lien
    const mobileLinks = mobileMenu.querySelectorAll('.navbar-mobile-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ══════════════════════════════════════════
  // 3. LIEN ACTIF — Marquer la page courante
  // ══════════════════════════════════════════
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // ══════════════════════════════════════════
  // 4. ANIMATIONS AU SCROLL AVANCÉES
  // ══════════════════════════════════════════
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Délai cascade pour les éléments multiples
        const delay = index * 150;
        setTimeout(() => {
          entry.target.classList.add('animate-fade-in-up');
          entry.target.style.opacity = '1';
        }, delay);

        // Animations spéciales selon le type d'élément
        if (entry.target.classList.contains('service-card')) {
          entry.target.style.animationDelay = `${index * 0.1}s`;
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observer tous les éléments avec data-animate
  const animatedElements = document.querySelectorAll('[data-animate]');
  animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
  });

  // ══════════════════════════════════════════
  // 5. ANIMATIONS AU SURVOL INTERACTIVES
  // ══════════════════════════════════════════
  // Animation des cartes de service
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-12px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Animation des boutons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'translateY(-2px) scale(1.02)';
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translateY(0) scale(1)';
    });

    btn.addEventListener('mousedown', () => {
      btn.style.transform = 'translateY(0) scale(0.98)';
    });

    btn.addEventListener('mouseup', () => {
      btn.style.transform = 'translateY(-2px) scale(1.02)';
    });
  });

  // ══════════════════════════════════════════
  // 6. ANIMATIONS DE SCROLL PARALLAX
  // ══════════════════════════════════════════
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';

    // Animation du hero au scroll
    const heroInner = document.querySelector('.hero-inner');
    if (heroInner) {
      const scrolled = currentScrollY * 0.12;
      heroInner.style.transform = `translateY(${scrolled}px)`;
    }

    // Animation des éléments décoratifs
    const decorativeElements = document.querySelectorAll('.decorative-float');
    decorativeElements.forEach(el => {
      const speed = parseFloat(el.dataset.speed) || 0.5;
      const yPos = -(currentScrollY * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });

    lastScrollY = currentScrollY;
  });

  // ══════════════════════════════════════════
  // 7. ANIMATIONS AU CLIC
  // ══════════════════════════════════════════
  document.addEventListener('click', (e) => {
    // Effet ripple sur les boutons
    if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
      const btn = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');
      const ripple = document.createElement('span');
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple-effect');

      btn.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    }
  });

  // ══════════════════════════════════════════
  // 8. ANIMATIONS DE FORMULAIRE
  // ══════════════════════════════════════════
  const formInputs = document.querySelectorAll('.form-input, .form-textarea, .form-select');
  formInputs.forEach(input => {
    // Animation au focus
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
      // Validation simple
      if (input.value.trim() !== '') {
        input.classList.add('valid');
        input.classList.remove('invalid');
      } else if (input.hasAttribute('required')) {
        input.classList.add('invalid');
        input.classList.remove('valid');
      }
    });

    // Animation au survol
    input.addEventListener('mouseenter', () => {
      if (!input.classList.contains('focused')) {
        input.style.transform = 'translateY(-1px)';
      }
    });

    input.addEventListener('mouseleave', () => {
      if (!input.classList.contains('focused')) {
        input.style.transform = 'translateY(0)';
      }
    });
  });

  // ══════════════════════════════════════════
  // 9. ANIMATIONS DÉCORATIVES
  // ══════════════════════════════════════════
  // Particules flottantes
  const createParticle = () => {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.style.cssText = `
      position: fixed;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      background: ${Math.random() > 0.5 ? 'var(--secondary)' : 'var(--accent)'};
      border-radius: 50%;
      opacity: ${Math.random() * 0.5 + 0.1};
      pointer-events: none;
      z-index: -1;
      left: ${Math.random() * 100}vw;
      top: 100vh;
      animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
    `;

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 15000);
  };

  // Créer des particules occasionnellement
  setInterval(() => {
    if (Math.random() > 0.95) { // 5% de chance chaque intervalle
      createParticle();
    }
  }, 2000);

  // ══════════════════════════════════════════
  // 10. ANIMATIONS DE CHARGEMENT
  // ══════════════════════════════════════════
  // Simuler un petit délai de chargement pour les animations d'entrée
  setTimeout(() => {
    document.body.classList.add('loaded');
    const spinner = document.querySelector('.loading-spinner');
    if (spinner) {
      spinner.style.opacity = '0';
      setTimeout(() => spinner.remove(), 600);
    }
  }, 500);

  // ══════════════════════════════════════════
  // 5. ANNÉE DYNAMIQUE dans le footer
  // ══════════════════════════════════════════
  const yearEl = document.querySelector('.footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
