// ========================================
// VARIABLES GLOBALES
// ========================================
let isDarkTheme = false;

// ========================================
// ANIMACIÓN DE CONTADORES
// ========================================
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// ========================================
// OBSERVADOR DE INTERSECCIÓN PARA ANIMAR CONTADORES
// ========================================
function initCounterAnimation() {
  const projectsCounter = document.getElementById('projects-count');
  const clientsCounter = document.getElementById('clients-count');
  const awardsCounter = document.getElementById('awards-count');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(projectsCounter, 50);
        animateCounter(clientsCounter, 35);
        animateCounter(awardsCounter, 12);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const aboutSection = document.querySelector('.about');
  if (aboutSection) {
    observer.observe(aboutSection);
  }
}

// ========================================
// CAMBIAR TEMA (DARK/LIGHT)
// ========================================
function toggleTheme() {
  isDarkTheme = !isDarkTheme;
  document.body.classList.toggle('dark-theme');
  
  const themeButton = document.querySelector('.theme-toggle');
  themeButton.textContent = isDarkTheme ? '☀️' : '🌙';
  
  showToast(isDarkTheme ? '🌙 Modo oscuro activado' : '☀️ Modo claro activado');
}

// ========================================
// SCROLL SUAVE A SECCIONES
// ========================================
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// ========================================
// MOSTRAR INFO DE PROYECTO
// ========================================
function showProjectInfo(projectName) {
  showToast(`✨ Ver proyecto: ${projectName}`);
  
  // Aquí podrías añadir lógica para abrir un modal o redirigir
  console.log(`Mostrando información del proyecto: ${projectName}`);
}

// ========================================
// MANEJAR ENVÍO DE FORMULARIO
// ========================================
function handleFormSubmit(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  // Simulación de envío
  console.log('=== FORMULARIO ENVIADO ===');
  console.log('Nombre:', name);
  console.log('Email:', email);
  console.log('Mensaje:', message);
  console.log('========================');
  
  // Mostrar notificación
  showToast(`¡Gracias ${name}! Tu mensaje ha sido enviado 💌`);
  
  // Limpiar formulario
  document.getElementById('contactForm').reset();
  
  // Añadir efecto visual al botón
  const submitButton = event.target.querySelector('button[type="submit"]');
  submitButton.style.transform = 'scale(0.95)';
  setTimeout(() => {
    submitButton.style.transform = 'scale(1)';
  }, 200);
}

// ========================================
// MOSTRAR TOAST (NOTIFICACIONES)
// ========================================
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  
  toastMessage.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ========================================
// SCROLL TO TOP
// ========================================
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// ========================================
// MOSTRAR/OCULTAR BOTÓN SCROLL TO TOP
// ========================================
function handleScrollButton() {
  const scrollButton = document.getElementById('scrollTop');
  
  if (window.pageYOffset > 300) {
    scrollButton.classList.add('show');
  } else {
    scrollButton.classList.remove('show');
  }
}

// ========================================
// EFECTO PARALLAX EN SCROLL
// ========================================
function handleParallax() {
  const scrolled = window.pageYOffset;
  const floatingCards = document.querySelectorAll('.floating-card');
  
  floatingCards.forEach((card, index) => {
    const speed = 0.2 + (index * 0.1);
    const yPos = scrolled * speed;
    card.style.transform = `translateY(${yPos}px)`;
  });
}

// ========================================
// ANIMACIÓN DE ENTRADA PARA ELEMENTOS
// ========================================
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observar elementos que queremos animar
  const animatedElements = document.querySelectorAll('.project-card, .skill-item, .info-card');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ========================================
// NAVEGACIÓN ACTIVA
// ========================================
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// ========================================
// EFECTO DE ESCRITURA EN HERO
// ========================================
function typeWriterEffect() {
  const texts = [
    'Diseñadora Creativa',
    'Desarrolladora Web',
    'UI/UX Designer',
    'Creative Coder'
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const heroTitle = document.querySelector('.gradient-text');
  
  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      heroTitle.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      heroTitle.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
  }
  
  // Iniciar después de que la página cargue
  setTimeout(() => {
    type();
  }, 2000);
}

// ========================================
// CURSOR PERSONALIZADO (OPCIONAL)
// ========================================
function initCustomCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  
  // Cambiar cursor en elementos interactivos
  const interactiveElements = document.querySelectorAll('a, button, .project-card');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
    });
  });
}

// ========================================
// AÑADIR PARTÍCULAS DE FONDO (OPCIONAL)
// ========================================
function createParticles() {
  const hero = document.querySelector('.hero');
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles';
  hero.appendChild(particlesContainer);
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 5 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particlesContainer.appendChild(particle);
  }
}

// ========================================
// EVENTOS DE TECLADO
// ========================================
function initKeyboardEvents() {
  document.addEventListener('keydown', (e) => {
    // Presionar 'T' para cambiar tema
    if (e.key === 't' || e.key === 'T') {
      toggleTheme();
    }
    
    // Presionar 'ESC' para ir al inicio
    if (e.key === 'Escape') {
      scrollToTop();
    }
  });
}

// ========================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  console.log('✨ Página cargada correctamente');
  console.log('📁 Proyecto: mi-pagina-avanzada');
  console.log('📄 Archivos: index.html, style.css, script.js');
  
  // Inicializar funciones
  initCounterAnimation();
  initScrollAnimations();
  // typeWriterEffect(); // Descomentar si quieres el efecto de escritura
  // createParticles(); // Descomentar si quieres partículas
  
  // Event Listeners
  window.addEventListener('scroll', () => {
    handleScrollButton();
    handleParallax();
    updateActiveNav();
  });
  
  // Mensaje de bienvenida
  setTimeout(() => {
    showToast('👋 ¡Bienvenido a mi portafolio!');
  }, 1000);
  
  // Inicializar eventos de teclado
  initKeyboardEvents();
  
  // Añadir efecto hover a las tarjetas de proyectos
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Prevenir comportamiento por defecto en enlaces sociales
  const socialLinks = document.querySelectorAll('.social-link');
  socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const platform = link.textContent.trim();
      showToast(`🔗 Abriendo ${platform}...`);
    });
  });
});

// ========================================
// DETECTAR SI EL USUARIO PREFIERE MODO OSCURO
// ========================================
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  // El usuario prefiere modo oscuro
  console.log('🌙 Preferencia del sistema: Modo oscuro');
  // Descomentar la siguiente línea para activar automáticamente
  // toggleTheme();
}

// ========================================
// OPTIMIZACIÓN DE RENDIMIENTO
// ========================================
// Throttle function para optimizar eventos de scroll
function throttle(func, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

// Aplicar throttle a eventos de scroll
window.addEventListener('scroll', throttle(() => {
  handleScrollButton();
  handleParallax();
  updateActiveNav();
}, 100));

// ========================================
// FUNCIONES DE UTILIDAD
// ========================================

// Función para obtener posición de scroll
function getScrollPosition() {
  return window.pageYOffset || document.documentElement.scrollTop;
}

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

let clickCount = 0;
const logo = document.querySelector('.logo');

if (logo) {
  logo.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 5) {
      showToast('🎉 ¡Has encontrado un easter egg! 🥚');
      logo.style.transform = 'rotate(360deg)';
      setTimeout(() => {
        logo.style.transform = 'rotate(0deg)';
        clickCount = 0;
      }, 1000);
    }
  });
}
console.log('🚀 Script cargado completamente');
console.log('💡 Tip: Presiona "T" para cambiar el tema');
console.log('💡 Tip: Presiona "ESC" para ir al inicio');