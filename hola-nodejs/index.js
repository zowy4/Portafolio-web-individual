// Funcionalidades adicionales para el portafolio
document.addEventListener('DOMContentLoaded', function() {
    // Efecto de typing para el título principal
    const title = document.querySelector('#hero h1');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
    
    // Efecto de parallax mejorado para el mouse
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        parallaxElements.forEach((element, index) => {
            const depth = 20 + (index * 5);
            const moveX = mouseX * depth;
            const moveY = mouseY * depth;
            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
    
    // Efecto de hover para las tarjetas de tecnología
    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
        });
    });
    
    // Animación de contadores para estadísticas
    const counters = document.querySelectorAll('[data-count]');
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const current = parseInt(counter.textContent) || 0;
            const increment = target / 100;
            
            if (current < target) {
                counter.textContent = Math.ceil(current + increment);
                setTimeout(animateCounters, 20);
            } else {
                counter.textContent = target;
            }
        });
    };
    
    // Intersection Observer para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animar contadores cuando sean visibles
                if (entry.target.querySelector('[data-count]')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos
    const elementsToObserve = document.querySelectorAll('.reveal, .tech-card, .card-container');
    elementsToObserve.forEach(el => observer.observe(el));
    
    // Efecto de partículas interactivas
    const canvas = document.querySelector('#canvas-container canvas');
    if (canvas) {
        canvas.addEventListener('mousemove', function(e) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Crear efecto de ondas en las partículas
            const event = new CustomEvent('mouseMove', {
                detail: { x, y }
            });
            window.dispatchEvent(event);
        });
    }
    
    // Smooth scrolling para enlaces internos
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
    
    // Efecto de resplandor en el botón de envío
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Efecto de pulso
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Mostrar mensaje de confirmación
            const message = document.createElement('div');
            message.className = 'fixed top-4 right-4 bg-primary text-dark px-6 py-3 rounded-lg shadow-lg z-50';
            message.textContent = '¡Mensaje enviado! Te contactaré pronto.';
            document.body.appendChild(message);
            
            setTimeout(() => {
                message.remove();
            }, 3000);
        });
    }
    
    // Efecto de rotación 3D en las tarjetas de proyecto
    const projectCards = document.querySelectorAll('.card-container');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.querySelector('.card-inner').style.transform = 
                `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.card-inner').style.transform = 
                'rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
    
    // Efecto de typing para el subtítulo
    const subtitle = document.querySelector('#hero p');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        let i = 0;
        
        function typeSubtitle() {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeSubtitle, 50);
            }
        }
        
        setTimeout(typeSubtitle, 2000);
    }
    
    // Efecto de ondas en el fondo
    const createRipple = (e) => {
        const ripple = document.createElement('div');
        const rect = e.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        e.target.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    };
    
    // Agregar efecto de ondas a los botones
    document.querySelectorAll('button, .tech-card, .card-container').forEach(element => {
        element.addEventListener('click', createRipple);
    });
    
    // Agregar estilos para la animación de ondas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});