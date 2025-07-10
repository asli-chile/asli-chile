// ===== VARIABLES GLOBALES =====
let isLoading = true;
let currentSection = 'home';

// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        isLoading = false;
        
        // Iniciar animaciones después del loading
        initAnimations();
        initCounters();
        initScrollEffects();
        
        // Inicializar partículas con un pequeño delay para mejor rendimiento
        setTimeout(() => {
            initParticles();
            // También inicializar la función global si no existe
            if (typeof window.initializeParticles !== 'function') {
                window.initializeParticles = initParticles;
            }
        }, 500);
    }, 3000);
});

// ===== NAVIGATION =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Manejar el logo de navegación
const logoLink = document.querySelector('.logo-link');
if (logoLink) {
    logoLink.addEventListener('click', (e) => {
        // Verificar si estamos en la página principal
        const isOnMainPage = window.location.pathname.endsWith('index.html') || 
                           window.location.pathname.endsWith('/') || 
                           window.location.pathname === '';
        
        // Si no estamos en la página principal, redirigir a index.html
        if (!isOnMainPage) {
            e.preventDefault();
            window.location.href = 'index.html';
        }
        // Si estamos en la página principal, el comportamiento por defecto (scroll to top) funcionará
    });
}

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Función de scroll suave con easing
function smoothScrollTo(targetY, duration = 800) {
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    let startTime = null;

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutQuad(progress);
        window.scrollTo(0, startY + distance * ease);
        if (progress < 1) {
            requestAnimationFrame(animation);
        } else {
            window.scrollTo(0, targetY);
            if (typeof window.setGlobalTargetScroll === 'function') {
                window.setGlobalTargetScroll();
            }
        }
    }
    requestAnimationFrame(animation);
}

// Smooth scrolling for navigation links
let isScrollingMenu = false;
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Cerrar menú móvil
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        if (isScrollingMenu) {
            console.log('Scroll bloqueado: ya está en curso.');
            return;
        }
        isScrollingMenu = true;
        e.preventDefault();
        const targetId = link.getAttribute('href');
        
        // Verificar si estamos en la página principal (index.html)
        const isOnMainPage = window.location.pathname.endsWith('index.html') || 
                           window.location.pathname.endsWith('/') || 
                           window.location.pathname === '';
        
        console.log('Click en menú:', targetId, 'Página actual:', window.location.pathname, 'En página principal:', isOnMainPage);
        
        // Si el enlace es "Inicio" y no estamos en la página principal, redirigir
        if (targetId === '#home' && !isOnMainPage) {
            window.location.href = 'index.html';
            return;
        }
        
        // Si el href ya contiene index.html, usar el href directamente
        if (targetId.includes('index.html')) {
            window.location.href = targetId;
            return;
        }
        
        // Si estamos en la página principal, hacer scroll normal
        if (isOnMainPage) {
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.disableGlobalSmoothScroll = true; // Desactivar smooth scroll global para cualquier scroll programático
                if (targetId === '#home') {
                    smoothScrollTo(0, 900);
                } else if (targetId === '#contact' || targetId === '#services') {
                    // Para la sección de contacto y servicios, usar scroll nativo para evitar conflictos
                    const navbar = document.querySelector('.navbar');
                    let yOffset = -(navbar ? navbar.offsetHeight : 70);
                    const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    
                    // Desactivar scroll global permanentemente para contacto y servicios
                    window.disableGlobalSmoothScroll = true;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                    
                    setTimeout(() => { 
                        isScrollingMenu = false; 
                        window.resetGlobalTargetScroll(); // Resetear targetScroll
                    }, 1000);
                } else {
                    const navbar = document.querySelector('.navbar');
                    let yOffset = -(navbar ? navbar.offsetHeight : 70);
                    // Offset especial para industria frutícola
                    if (targetId === '#fruits') {
                        yOffset -= -50; // Baja 100px extra
                    }
                    const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    smoothScrollTo(y, 900);
                    setTimeout(() => { window.disableGlobalSmoothScroll = false; isScrollingMenu = false; }, 1000); // Reactivar después de 1s
                    window.resetGlobalTargetScroll(); // Resetear targetScroll
                }
            } else {
                isScrollingMenu = false;
            }
        } else {
            // Si no estamos en la página principal y el enlace no es "Inicio", redirigir a la página principal con el anchor
            window.location.href = 'index.html' + targetId;
        }
    });
});

// Unificar scroll suave para todos los enlaces internos (menú y botones)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (!targetId || targetId === '#') return;
    
    // Verificar si estamos en la página principal
    const isOnMainPage = window.location.pathname.endsWith('index.html') || 
                       window.location.pathname.endsWith('/') || 
                       window.location.pathname === '';
    
    // Si no estamos en la página principal, redirigir a index.html con el anchor
    if (!isOnMainPage) {
      e.preventDefault();
      // Si el href ya contiene index.html, usar el href directamente
      if (this.getAttribute('href').includes('index.html')) {
        window.location.href = this.getAttribute('href');
      } else {
        window.location.href = 'index.html' + targetId;
      }
      return;
    }
    
    // Si estamos en la página principal, hacer scroll normal
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const navbar = document.querySelector('.navbar');
      let yOffset = -(navbar ? navbar.offsetHeight : 70);
      // Offset especial para industria frutícola
      if (targetId === '#fruits') {
        yOffset -= -50;
      }
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      smoothScrollTo(y, 900);
    }
  });
});

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        navbar.style.background = 'rgb(0, 5, 41)';
        navbar.style.boxShadow = '0 10px 20px rgb(0, 0, 0)';
    } else {
        navbar.style.background = 'rgb(0, 5, 41)';
        navbar.style.boxShadow = 'none';
    }
});

// ===== BACK TO TOP BUTTON =====
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// ===== ANIMATION FUNCTIONS =====
function initAnimations() {
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.service-card, .team-member, .stat, .fruit-item, .partner-logo');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
    
    // Add animation class
    document.addEventListener('scroll', () => {
        animateElements.forEach(el => {
            if (isElementInViewport(el)) {
                el.style.transition = 'all 0.6s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    });
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

// ===== COUNTER ANIMATION =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start counter when element is in viewport
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterObserver.observe(counter);
    });
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        // Eliminar parallax para hero-content y hero-buttons
        // const scrolled = window.pageYOffset;
        // const hero = document.querySelector('.hero');
        // const heroContent = document.querySelector('.hero-content');
        // if (hero) {
        //     hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        // }
        // if (heroContent) {
        //     heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        // }
    });
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== FORM HANDLING =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');

        if (!name || !email || !message) {
            showNotification('Por favor, completa todos los campos requeridos.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Por favor, ingresa un email válido.', 'error');
            return;
        }

        // Mensaje simple, sin saltos de línea ni caracteres especiales
        let wspMsg = `Hola, mi nombre es ${name}. Mi correo es ${email}`;
        if (phone && phone.trim() !== '') {
            wspMsg += ` y mi teléfono es ${phone}`;
        }
        wspMsg += `. Quiero consultar: ${message}`;
        // Eliminar saltos de línea y espacios extra
        wspMsg = wspMsg.replace(/\n|\r/g, ' ').replace(/ +/g, ' ');

        const wspNumber = '56952029769';
        const wspUrl = `https://wa.me/${wspNumber}?text=${encodeURIComponent(wspMsg)}`;

        // Redirigir en la misma ventana para evitar bloqueos de popups
        window.location.href = wspUrl;
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#669900' : type === 'error' ? '#ff4444' : '#007A7B'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===== PARTICLE EFFECTS =====
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Definir puntos fijos (simulan ciudades)
    const points = [
        { x: 15, y: 80 },
        { x: 30, y: 40 },
        { x: 50, y: 70 },
        { x: 70, y: 30 },
        { x: 85, y: 60 },
        { x: 60, y: 20 },
        { x: 40, y: 15 },
        { x: 80, y: 10 }
    ];

    // Crear aviones que viajan entre pares de puntos
    for (let i = 0; i < 10; i++) {
        const from = points[Math.floor(Math.random() * points.length)];
        let to;
        do {
            to = points[Math.floor(Math.random() * points.length)];
        } while (to === from);

        const plane = document.createElement('i');
        plane.className = 'fas fa-plane plane-particle';
        const size = Math.random() * 18 + 12;
        plane.style.cssText = `
            position: absolute;
            font-size: ${size}px;
            color: #b0c4de;
            opacity: 0.8;
            left: ${from.x}%;
            top: ${from.y}%;
            transform: rotate(0deg);
            pointer-events: none;
        `;
        hero.appendChild(plane);

        // Animar el avión de from a to
        animatePlane(plane, from, to, size);
    }
}

function animatePlane(plane, from, to, size) {
    const duration = Math.random() * 6 + 6; // 6-12s
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    plane.style.transform = `rotate(${angle}deg)`;

    plane.animate([
        { left: from.x + '%', top: from.y + '%', opacity: 0.8 },
        { left: to.x + '%', top: to.y + '%', opacity: 0.2 }
    ], {
        duration: duration * 1000,
        easing: 'linear',
        fill: 'forwards'
    });

    setTimeout(() => {
        // Reiniciar el viaje con nuevos puntos
        const points = [
            { x: 15, y: 80 },
            { x: 30, y: 40 },
            { x: 50, y: 70 },
            { x: 70, y: 30 },
            { x: 85, y: 60 },
            { x: 60, y: 20 },
            { x: 40, y: 15 },
            { x: 80, y: 10 }
        ];
        let newFrom = to;
        let newTo;
        do {
            newTo = points[Math.floor(Math.random() * points.length)];
        } while (newTo === newFrom);
        animatePlane(plane, newFrom, newTo, size);
    }, duration * 1000);
}

// Add particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== HOVER EFFECTS =====
function initHoverEffects() {
    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Team member hover effect
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            member.style.transform = 'translateY(-10px)';
        });
        
        teamMembers.forEach(m => {
            if (m !== member) {
                m.style.opacity = '0.7';
                m.style.transform = 'scale(0.95)';
            }
        });
    });
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseleave', () => {
            teamMembers.forEach(m => {
                m.style.opacity = '1';
                m.style.transform = 'translateY(0) scale(1)';
            });
        });
    });
}

// ===== LAZY LOADING FOR IMAGES =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== MOBILE MENU ENHANCEMENT =====
function enhanceMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const body = document.body;
    
    navToggle.addEventListener('click', () => {
        body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });
}

// ===== PERFORMANCE OPTIMIZATION =====
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Perform scroll-based operations here
        }, 16); // ~60fps
    });
    
    // Throttle resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(() => {
            // Perform resize-based operations here
        }, 250);
    });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functions
    initHoverEffects();
    initLazyLoading();
    enhanceMobileMenu();
    optimizePerformance();
    createParticles();
    
    // Add loading class to body
    document.body.classList.add('loaded');
    
    // Preload critical images
    const criticalImages = [
        'IMG/logo.png',
        'IMG/mariobasaez.png',
        'IMG/hansv.png',
        'IMG/stefanie.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // You can add error reporting here
});

// ===== ANALYTICS (PLACEHOLDER) =====
function trackEvent(eventName, eventData = {}) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, eventData);
    
    // Example: Track form submissions
    if (eventName === 'form_submit') {
        // Add your analytics code here
    }
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
function enhanceAccessibility() {
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close mobile menu
            const navToggle = document.getElementById('nav-toggle');
            const navMenu = document.getElementById('nav-menu');
            if (navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
    
    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(el => {
        // Excluir el logo link del outline de focus
        if (el.id === 'logo-home-link') {
            return;
        }
        
        el.addEventListener('focus', () => {
            el.style.outline = '2px solid #669900';
            el.style.outlineOffset = '2px';
        });
        
        el.addEventListener('blur', () => {
            el.style.outline = '';
            el.style.outlineOffset = '';
        });
    });
}

// Initialize accessibility enhancements
enhanceAccessibility();

// ===== CONTACT & SERVICES SECTION SCROLL FIX =====
// Eliminado: No desactivar smooth scroll en ninguna sección

// ===== SMOOTH SCROLL GLOBAL PARA RUEDA DEL MOUSE =====
// Eliminado para evitar interferencia con el scroll manual del usuario

// Back to Top Button
backToTopBtn.addEventListener('click', () => {
    window.disableGlobalSmoothScroll = true; // Desactivar smooth scroll global para scroll programático
    smoothScrollTo(0, 900);
    setTimeout(() => { window.disableGlobalSmoothScroll = false; }, 1000); // Reactivar después de 1s
    window.resetGlobalTargetScroll(); // Resetear targetScroll
});

// Logo Home Link - Same behavior as Back to Top
const logoHomeLink = document.getElementById('logo-home-link');
if (logoHomeLink) {
    logoHomeLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.disableGlobalSmoothScroll = true; // Desactivar smooth scroll global para scroll programático
        smoothScrollTo(0, 900);
        setTimeout(() => { window.disableGlobalSmoothScroll = false; }, 1000); // Reactivar después de 1s
        window.resetGlobalTargetScroll(); // Resetear targetScroll
    });
}

// ===== CAROUSEL ANIMATION FIX =====
function initCarousels() {
    const carousels = document.querySelectorAll('.carousel-track');
    
    carousels.forEach((carousel, index) => {
        // Forzar la animación CSS
        carousel.style.animation = 'none';
        carousel.offsetHeight; // Trigger reflow
        carousel.style.animation = null;
        
        // Aplicar animación específica según la sección
        const section = carousel.closest('section');
        if (section.classList.contains('navieras')) {
            carousel.style.animation = 'marquee 17.5s linear infinite';
        } else if (section.classList.contains('partners')) {
            carousel.style.animation = 'marquee 20s linear infinite';
        } else if (section.classList.contains('instituciones')) {
            carousel.style.animation = 'marquee 15.75s linear infinite';
        } else {
            carousel.style.animation = 'marquee 15s linear infinite';
        }
        
        // Asegurar que la animación esté activa
        carousel.style.animationPlayState = 'running';
    });
}

// Inicializar carruseles después del DOM
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initCarousels, 100);
});

// También inicializar después del loading
window.addEventListener('load', () => {
    setTimeout(initCarousels, 100);
});

// ===== PARTÍCULAS =====
// Función global para inicializar partículas en cualquier página
window.initializeParticles = function() {
    const particlesContainers = document.querySelectorAll('.particles');
    
    particlesContainers.forEach(container => {
        // Generar 500 partículas adicionales para un efecto más denso
        for (let i = 0; i < 500; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Propiedades aleatorias
            const size = Math.random() * 1.2 + 0.3; // 0.3px a 1.5px
            const top = Math.random() * 100; // 0% a 100%
            const left = Math.random() * 100; // 0% a 100%
            const delay = Math.random() * 15; // 0s a 15s
            const duration = Math.random() * 30 + 15; // 15s a 45s
            const opacity = Math.random() * 0.7 + 0.3; // 0.3 a 1
            
            // Elegir tipo de animación aleatoria
            const animationTypes = ['particleFloat', 'particleOrbit', 'particleSpin'];
            const animationType = animationTypes[Math.floor(Math.random() * animationTypes.length)];
            
            // Aplicar estilos
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                top: ${top}%;
                left: ${left}%;
                animation-delay: ${delay}s;
                animation-duration: ${duration}s;
                animation-name: ${animationType};
                opacity: ${opacity};
                animation-iteration-count: infinite;
                animation-timing-function: linear;
            `;
            
            // Agregar al contenedor
            container.appendChild(particle);
        }
        
        // Aplicar efectos a todas las partículas (originales + nuevas)
        const allParticles = container.querySelectorAll('.particle');
        
        allParticles.forEach((particle, index) => {
            // Efecto de brillo aleatorio más frecuente
            setInterval(() => {
                if (Math.random() > 0.6) {
                    particle.style.filter = 'brightness(2.5) drop-shadow(0 0 5px rgba(255, 255, 255, 0.9))';
                    setTimeout(() => {
                        particle.style.filter = 'brightness(1)';
                    }, 200);
                }
            }, 1000 + Math.random() * 3000);
            
            // Efecto de parpadeo más frecuente
            setInterval(() => {
                if (Math.random() > 0.75) {
                    particle.style.opacity = '0.2';
                    setTimeout(() => {
                        particle.style.opacity = particle.style.opacity || '1';
                    }, 150);
                }
            }, 2000 + Math.random() * 4000);
            
            // Colores variados para más diversidad
            const colorOptions = [
                'rgba(255, 255, 255, 0.9)',
                'rgba(255, 255, 255, 0.7)',
                'rgba(255, 255, 255, 0.5)',
                'rgba(74, 144, 226, 0.8)',
                'rgba(74, 144, 226, 0.6)',
                'rgba(255, 255, 255, 0.8)',
                'rgba(255, 255, 255, 0.6)',
                'rgba(74, 144, 226, 0.7)'
            ];
            particle.style.background = colorOptions[index % colorOptions.length];
            
            // Efecto de escala aleatoria
            setInterval(() => {
                if (Math.random() > 0.8) {
                    particle.style.transform = `scale(${1 + Math.random() * 0.5})`;
                    setTimeout(() => {
                        particle.style.transform = 'scale(1)';
                    }, 500);
                }
            }, 3000 + Math.random() * 5000);
        });
    });
};

function initParticles() {
    // Usar la función global para mantener consistencia
    if (typeof window.initializeParticles === 'function') {
        window.initializeParticles();
    }
}
