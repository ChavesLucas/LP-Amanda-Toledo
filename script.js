// ========================================
// SCRIPT - Dra Amanda Toledo
// Conversão Otimizada + Animações
// ========================================

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ========================================
// HEADER — compactar ao rolar
// ========================================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========================================
// SCROLL REVEAL — cards e steps
// ========================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, entry.target.dataset.delay || 0);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.card').forEach((el, i) => {
    el.dataset.delay = i * 60;
    revealObserver.observe(el);
});

document.querySelectorAll('.step').forEach((el, i) => {
    el.dataset.delay = i * 100;
    revealObserver.observe(el);
});

// ========================================
// CONTADOR DE ESTATÍSTICAS
// ========================================
function animateCounter(el, target, suffix = '') {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.textContent = target + suffix;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current) + suffix;
        }
    }, 20);
}

let statsAnimated = false;
const statsSection = document.querySelector('.about');

if (statsSection) {
    new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                document.querySelectorAll('.stat-number').forEach(stat => {
                    const raw = stat.textContent;
                    const num = parseInt(raw.replace(/\D/g, ''));
                    const suffix = raw.includes('+') ? '+' : (raw.includes('%') ? '%' : '');
                    if (!isNaN(num)) animateCounter(stat, num, suffix);
                });
            }
        });
    }, { threshold: 0.4 }).observe(statsSection);
}

// ========================================
// BOTÃO FLUTUANTE — mostrar após scroll
// ========================================
const floatBtn = document.getElementById('whatsappFloat');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        floatBtn.style.opacity = '1';
        floatBtn.style.transform = 'scale(1)';
    } else {
        floatBtn.style.opacity = '0';
        floatBtn.style.transform = 'scale(0.8)';
    }
});

// Iniciar escondido
floatBtn.style.opacity = '0';
floatBtn.style.transform = 'scale(0.8)';
floatBtn.style.transition = 'opacity 0.35s ease, transform 0.35s ease';

// ========================================
// FEEDBACK VISUAL — clique nos botões WA
// ========================================
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function () {
        const original = this.innerHTML;
        const loadingTxt = this.classList.contains('whatsapp-float') 
            ? this.innerHTML 
            : '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg> Abrindo WhatsApp...';

        if (!this.classList.contains('whatsapp-float') && !this.classList.contains('btn-header-cta')) {
            this.innerHTML = loadingTxt;
            setTimeout(() => { this.innerHTML = original; }, 2500);
        }
    });
});

// ========================================
// NAV ATIVA ao scroll
// ========================================
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section[id]').forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) {
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
// CARDS — click para CTA
// ========================================
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelector('.cta-final')?.scrollIntoView({ behavior: 'smooth' });
    });
    card.style.cursor = 'pointer';
});

console.log('%c✅ Dra Amanda Toledo — Site carregado!', 'color:#22C55E; font-size:14px; font-weight:bold;');