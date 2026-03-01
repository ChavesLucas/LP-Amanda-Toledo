// ========================================
// SCRIPT - Dra Amanda Toledo (REWORK)
// Animações, Interatividade e Otimizações
// ========================================

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// SCROLL REVEAL - Animar elementos ao scrollar
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar cards e steps
document.querySelectorAll('.card, .step, .trust-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ========================================
// BOTÃO CTA - Efeito de Pulse
// ========================================

const ctaButtons = document.querySelectorAll('.btn-primary');
ctaButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'pulse 2s infinite';
        }, 10);
    });
});

// ========================================
// CONTADOR DE ESTATÍSTICAS
// ========================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
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

// Animar números quando a seção "Sobre" fica visível
const statsSection = document.querySelector('.about');
let statsAnimated = false;

const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            document.querySelectorAll('.stat-number').forEach(stat => {
                const text = stat.textContent.replace(/[^0-9]/g, '');
                const number = parseInt(text);
                if (!isNaN(number)) {
                    animateCounter(stat, number);
                }
            });
            statsAnimated = true;
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// ========================================
// RASTREAMENTO DE CLIQUES - CTA
// ========================================

document.querySelectorAll('.btn-primary, .btn-white').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Adicionar classe de clique para feedback visual
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
        
        // Log para analytics
        console.log('CTA Clicado:', this.textContent, 'URL:', this.href);
    });
});

// ========================================
// EFEITO DE HOVER NAS CARDS
// ========================================

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
    });
    
    card.addEventListener('click', function() {
        // Scroll suave para CTA ao clicar em uma card
        const ctaSection = document.querySelector('.cta-final');
        if (ctaSection) {
            ctaSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========================================
// NAVBAR ATIVA - Destacar seção atual
// ========================================

window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav a').forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#4ADE80';
        }
    });
});

// ========================================
// FEEDBACK VISUAL - Botão WhatsApp
// ========================================

document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Adicionar feedback visual
        const originalText = this.textContent;
        this.textContent = '✓ Abrindo WhatsApp...';
        
        setTimeout(() => {
            this.textContent = originalText;
        }, 2000);
    });
});

// ========================================
// LAZY LOADING DE IMAGENS
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// ANALYTICS - Google Analytics
// ========================================

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID');

// ========================================
// MOBILE MENU - Responsividade
// ========================================

// Fechar menu ao clicar em um link (se houver menu mobile)
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', function() {
        // Fechar menu mobile se existir
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
        }
    });
});

// ========================================
// PERFORMANCE - Preload de recursos críticos
// ========================================

window.addEventListener('load', function() {
    // Preload de fontes
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Open+Sans:wght@400;500;600&display=swap';
    document.head.appendChild(link);
});

// ========================================
// LOG DE INICIALIZAÇÃO
// ========================================

console.log('%c🎉 Dra Amanda Toledo - LP Rework 2026', 'color: #22C55E; font-size: 16px; font-weight: bold;');
console.log('%cScript carregado com sucesso! ✓', 'color: #22C55E; font-size: 14px;');
console.log('%cAnimações e interatividades ativadas.', 'color: #666; font-size: 12px;');
