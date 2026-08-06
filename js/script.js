document.addEventListener('DOMContentLoaded', () => {

  /* ========== LOADER ========== */
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1500);

  /* ========== PARTICLES ========== */
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#7BA888' },
        shape: { type: 'circle' },
        opacity: { value: 0.3, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#7BA888', opacity: 0.1, width: 1 },
        move: { enable: true, speed: 1.5, direction: 'none', random: true, straight: false, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
      },
      retina_detect: true
    });
  }

  /* ========== PETALS ========== */
  (function createPetals() {
    const container = document.getElementById('petals');
    const petalCount = 15;
    for (let i = 0; i < petalCount; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal';
      const size = 12 + Math.random() * 16;
      petal.style.width = size + 'px';
      petal.style.height = size + 'px';
      petal.style.left = Math.random() * 100 + '%';
      petal.style.animationDuration = (8 + Math.random() * 12) + 's';
      petal.style.animationDelay = Math.random() * 15 + 's';
      petal.style.background = ['#7BA888', '#A8C9B5', '#8FB89A', '#6A9A76', '#2C3A2C'][Math.floor(Math.random() * 5)];
      container.appendChild(petal);
    }
  })();

  /* ========== FLOATING HEARTS ========== */
  (function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    setInterval(() => {
      const heart = document.createElement('i');
      heart.className = 'fas fa-heart';
      const size = 10 + Math.random() * 15;
      heart.style.cssText = `
        position: fixed;
        bottom: -20px;
        left: ${Math.random() * 100}vw;
        font-size: ${size}px;
        color: rgba(123, 168, 136, 0.3);
        animation: heartFloat ${6 + Math.random() * 8}s linear forwards;
        pointer-events: none;
        z-index: 9998;
      `;
      container.appendChild(heart);
      setTimeout(() => heart.remove(), 14000);
    }, 800);
  })();

  /* inject heartFloat keyframes */
  (function injectHeartKeyframes() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes heartFloat {
        0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0; }
        10% { opacity: 0.5; }
        90% { opacity: 0.5; }
        100% { transform: translateY(-100vh) rotate(360deg) scale(0.3); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  })();

  /* ========== NAVBAR ========== */
  const navbar = document.querySelector('.navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
    updateActiveLink();
  });

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 150;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  /* ========== REVEAL ON SCROLL ========== */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
  });

  /* ========== COUNTDOWN ========== */
  function updateCountdown() {
    const weddingDate = new Date('January 1, 2027 08:00:00').getTime();
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      document.getElementById('days').textContent = String(days).padStart(2, '0');
      document.getElementById('hours').textContent = String(hours).padStart(2, '0');
      document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
      document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
      document.querySelector('.countdown-grid').innerHTML = '<p style="color:var(--gold);font-size:24px;">Acara Sedang Berlangsung</p>';
    }
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ========== GALLERY MODAL ========== */
  const modal = document.getElementById('galleryModal');
  const modalImg = modal.querySelector('.modal-img');
  const modalClose = modal.querySelector('.modal-close');
  const modalPrev = modal.querySelector('.modal-prev');
  const modalNext = modal.querySelector('.modal-next');
  const galleryItems = document.querySelectorAll('.gallery-item');
  let currentIndex = 0;

  const gradients = [
    'linear-gradient(135deg, #7BA888, #A8C9B5)',
    'linear-gradient(135deg, #8FB89A, #6A9A76)',
    'linear-gradient(135deg, #2C3A2C, #7BA888)',
    'linear-gradient(135deg, #A8C9B5, #F4F8F5)',
    'linear-gradient(135deg, #6A9A76, #8FB89A)',
    'linear-gradient(135deg, #7BA888, #2C3A2C)'
  ];

  function openModal(index) {
    currentIndex = index;
    modalImg.style.background = gradients[currentIndex];
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    modalImg.style.background = gradients[currentIndex];
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    modalImg.style.background = gradients[currentIndex];
  }

  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => openModal(i));
  });

  modalClose.addEventListener('click', closeModal);
  modalPrev.addEventListener('click', prevImage);
  modalNext.addEventListener('click', nextImage);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  });

  /* ========== RSVP FORM ========== */
  const rsvpForm = document.getElementById('rsvpForm');
  const rsvpSuccess = document.getElementById('rsvpSuccess');

  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      attendance: document.querySelector('input[name="attendance"]:checked').value,
      guests: document.getElementById('guests').value,
      message: document.getElementById('message').value
    };

    const attendanceText = formData.attendance === 'hadir' ? 'Hadir' : 'Tidak Hadir';

    const wishCard = document.createElement('div');
    wishCard.className = 'wish-card';
    wishCard.style.animation = 'fadeUp 0.6s ease forwards';
    wishCard.innerHTML = `
      <div class="wish-avatar"><i class="fas fa-user"></i></div>
      <div class="wish-body">
        <h4>${formData.name}</h4>
        <p>${formData.message || 'Terima kasih atas undangannya, semoga menjadi keluarga yang bahagia!'}</p>
        <span class="wish-date">- ${attendanceText} (${formData.guests} Orang)</span>
      </div>
    `;

    document.getElementById('wishesGrid').prepend(wishCard);

    rsvpForm.style.display = 'none';
    rsvpSuccess.classList.add('active');
    rsvpForm.reset();

    setTimeout(() => {
      rsvpForm.style.display = 'grid';
      rsvpSuccess.classList.remove('active');
    }, 4000);
  });

  /* ========== MUSIC TOGGLE ========== */
  const musicBtn = document.getElementById("musicToggle");
  const audio = new Audio("assets/music.mp3");
  audio.loop = true;
  audio.volume = 0.3;
  let isMusicPlaying = false;

  function toggleMusic() {
    if (isMusicPlaying) {
      audio.pause();
      musicBtn.classList.add("paused");
    } else {
      audio.currentTime = 0; audio.play().catch(() => {});
      musicBtn.classList.remove("paused");
    }
    isMusicPlaying = !isMusicPlaying;
  }

  musicBtn.addEventListener("click", toggleMusic);

  /* ========== PARALLAX ON SCROLL ========== */
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * 0.3}px)`;
      hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
  });

  /* ========== DRESS CODE TOOLTIP ========== */
  document.querySelectorAll('.dress-color').forEach(el => {
    el.addEventListener('click', () => {
      const color = el.getAttribute('title');
      navigator.clipboard.writeText(color).catch(() => {});
    });
  });

  /* ========== ENVELOPE ANIMATION ========== */
  const envelopeOverlay = document.getElementById('envelopeOverlay');
  const envelopeFront = document.getElementById('envelopeFront');
  const envelopeClose = document.getElementById('envelopeClose');
  const invitationCard = document.getElementById('invitationCard');
  const heroBtn = document.querySelector('.hero-btn');
  let isEnvelopeOpen = false;
  let autoCloseTimer = null;

  if (heroBtn) {
    heroBtn.addEventListener('click', (e) => {
      e.preventDefault();
      envelopeOverlay.classList.add('active');
      isEnvelopeOpen = true;
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        if (envelopeFront) envelopeFront.classList.add('open');
        autoCloseTimer = setTimeout(proceedToInvitation, 3000);
      }, 500);
    });
  }

  function proceedToInvitation() {
    closeEnvelope();
    setTimeout(() => {
      const target = document.querySelector('#rsvp');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 600);
  }

  function closeEnvelope() {
    if (autoCloseTimer) clearTimeout(autoCloseTimer);
    if (envelopeFront) envelopeFront.classList.remove('open');
    setTimeout(() => {
      envelopeOverlay.classList.remove('active');
      document.body.style.overflow = '';
      isEnvelopeOpen = false;
    }, 400);
  }

  if (envelopeClose) {
    envelopeClose.addEventListener('click', closeEnvelope);
  }

  if (invitationCard) {
    invitationCard.addEventListener('click', proceedToInvitation);
    invitationCard.style.cursor = 'pointer';
  }

  if (envelopeOverlay) {
    envelopeOverlay.addEventListener('click', (e) => {
      if (e.target === envelopeOverlay) closeEnvelope();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isEnvelopeOpen) closeEnvelope();
  });

});
