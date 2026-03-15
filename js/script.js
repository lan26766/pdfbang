// 粒子背景
function initParticles() {
    const particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer) return;

    const particles = [];
    const particleCount = 100;

    // 创建粒子
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 255)}, ${Math.random() * 0.5 + 0.3})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        particle.style.animationDelay = Math.random() * 10 + 's';
        particlesContainer.appendChild(particle);
        particles.push(particle);
    }

    // 添加浮动动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
            }
            50% {
                transform: translateY(-20px) rotate(180deg);
            }
        }
        .particle {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    // 鼠标交互
    particlesContainer.addEventListener('mousemove', (e) => {
        const rect = particlesContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        particles.forEach(particle => {
            const particleRect = particle.getBoundingClientRect();
            const particleX = particleRect.left + particleRect.width / 2 - rect.left;
            const particleY = particleRect.top + particleRect.height / 2 - rect.top;
            const distance = Math.sqrt((x - particleX) ** 2 + (y - particleY) ** 2);

            if (distance < 100) {
                const force = (100 - distance) / 100;
                const angle = Math.atan2(y - particleY, x - particleX);
                const moveX = Math.cos(angle) * force * 20;
                const moveY = Math.sin(angle) * force * 20;
                particle.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force * 0.5})`;
                particle.style.opacity = 0.8;
            } else {
                particle.style.transform = 'translate(0px, 0px) scale(1)';
                particle.style.opacity = Math.random() * 0.5 + 0.3;
            }
        });
    });
}

// 导航栏滚动效果
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// 移动端菜单
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (!menuToggle || !closeMenu || !mobileMenu) return;

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // 点击外部关闭菜单
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target) && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// 平滑滚动
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 回到顶部按钮
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 滚动触发动画
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');

    function checkReveal() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight * 0.85) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', checkReveal);
    window.addEventListener('load', checkReveal);
    window.addEventListener('resize', checkReveal);
}

// 鼠标跟随效果
function initCursorFollower() {
    const cursorFollower = document.getElementById('cursor-follower');
    if (!cursorFollower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    function animateFollower() {
        const dx = mouseX - followerX;
        const dy = mouseY - followerY;
        const speed = 0.1;

        followerX += dx * speed;
        followerY += dy * speed;

        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animateFollower);
    }

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // 鼠标悬停效果
    const interactiveElements = document.querySelectorAll('a, button, .feature-card, .testimonial-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.backgroundColor = 'rgba(59, 130, 246, 0.5)';
        });

        element.addEventListener('mouseleave', () => {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.backgroundColor = 'rgba(59, 130, 246, 0.3)';
        });
    });

    animateFollower();
}

// 按钮涟漪效果
function initButtonRipple() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // 添加涟漪样式
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        .ripple {
            position: absolute;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: translate(-50%, -50%);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        @keyframes ripple {
            to {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// 视差效果
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');

    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(window.scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// 打字效果
function initTypingEffect() {
    const typingElements = document.querySelectorAll('.typing');

    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--primary-color)';
        element.style.whiteSpace = 'nowrap';
        element.style.overflow = 'hidden';

        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            } else {
                element.style.borderRight = 'none';
            }
        }

        // 延迟启动打字效果
        setTimeout(type, 1000);
    });
}

// 表单验证
function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'var(--error-color)';
                    input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
                } else {
                    input.style.borderColor = 'var(--border-color)';
                    input.style.boxShadow = 'none';
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('请填写所有必填字段');
            }
        });

        // 输入框焦点效果
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.borderColor = 'var(--primary-color)';
                input.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            });

            input.addEventListener('blur', () => {
                if (input.value.trim()) {
                    input.style.borderColor = 'var(--success-color)';
                    input.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
                } else {
                    input.style.borderColor = 'var(--border-color)';
                    input.style.boxShadow = 'none';
                }
            });
        });
    });
}

// 图片懒加载
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// 页面加载动画
function initPageLoad() {
    window.addEventListener('load', () => {
        const loading = document.querySelector('.loading');
        if (loading) {
            setTimeout(() => {
                loading.classList.add('hidden');
                setTimeout(() => {
                    loading.remove();
                }, 500);
            }, 1000);
        }

        // 触发初始动画
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 500);
    });
}

// 响应式导航
function initResponsiveNav() {
    function checkScreenSize() {
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.querySelector('.menu-toggle');

        if (!navLinks || !menuToggle) return;

        if (window.innerWidth <= 1024) {
            navLinks.style.display = 'none';
            menuToggle.style.display = 'block';
        } else {
            navLinks.style.display = 'flex';
            menuToggle.style.display = 'none';
        }
    }

    window.addEventListener('resize', checkScreenSize);
    window.addEventListener('load', checkScreenSize);
}

// 数字计数器动画
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');

    function animateCounter(counter) {
        const target = parseInt(counter.textContent.replace(/,/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        function updateCounter() {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        }

        updateCounter();
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// 主初始化函数
function init() {
    initParticles();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initBackToTop();
    initScrollReveal();
    initCursorFollower();
    initButtonRipple();
    initParallax();
    initTypingEffect();
    initFormValidation();
    initLazyLoad();
    initPageLoad();
    initResponsiveNav();
    initCounterAnimation();
}

// 启动所有功能
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// 性能优化：使用requestAnimationFrame进行动画
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// 性能优化：节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const context = this;
        const args = arguments;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

// 应用防抖和节流
window.addEventListener('scroll', debounce(() => {
    // 滚动事件处理
}, 16));

window.addEventListener('resize', throttle(() => {
    //  resize事件处理
}, 100));

// 错误处理
window.addEventListener('error', (e) => {
    console.error('Error:', e.message);
});

// 离线检测
window.addEventListener('offline', () => {
    console.log('You are now offline');
});

window.addEventListener('online', () => {
    console.log('You are now online');
});