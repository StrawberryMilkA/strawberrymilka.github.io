(function() {
    'use strict';

    // 导航栏滚动效果
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('backToTop');

    function handleScroll() {
        const scrollY = window.scrollY;
        // 导航栏阴影
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        // 回到顶部按钮显示
        if (scrollY > 600) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 移动端菜单切换
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // 切换图标动画（可选）
            this.classList.toggle('open');
        });

        // 点击导航链接关闭菜单
        const navLinkItems = navLinks.querySelectorAll('.nav-link');
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('open');
            });
        });

        // 点击菜单外关闭
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('open');
            }
        });
    }

    // 平滑滚动（针对不支持 smooth 的情况用 polyfill，但已设置html scroll-behavior:smooth）
    // 保留以防需要

    // 回到顶部
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 滚动淡入动画（简单示范：给 .timeline-card, .advantage-card 等添加进入动画）
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 需要观察的元素
    const animateElements = document.querySelectorAll('.timeline-card, .advantage-card, .join-card, .contact-card, .org-node-other');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // 初始化加载时若已在视野中则显示
    window.addEventListener('load', () => {
        handleScroll();
        // 手动触发一次观察
        animateElements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    });

})();
