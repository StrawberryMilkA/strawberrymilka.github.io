(function() {
    'use strict';

    const filterTags = document.querySelectorAll('.filter-tag');
    const newsCards = document.querySelectorAll('.news-card');

    // 筛选功能
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            filterTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');

            newsCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = '';
                    fadeIn(card);
                } else {
                    const categories = card.getAttribute('data-category');
                    if (categories && categories.split(' ').includes(filter)) {
                        card.style.display = '';
                        fadeIn(card);
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    function fadeIn(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(10px)';
        el.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        requestAnimationFrame(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }

    // AI 评论折叠/展开
    const aiReviews = document.querySelectorAll('.ai-review');
    aiReviews.forEach(review => {
        const header = review.querySelector('.ai-review-header');
        const body = review.querySelector('.ai-review-body');
        const disclaimer = review.querySelector('.ai-disclaimer');
        let collapsed = false;

        header.addEventListener('click', function() {
            collapsed = !collapsed;
            const label = header.querySelector('.ai-label');
            if (collapsed) {
                body.style.display = 'none';
                if (disclaimer) disclaimer.style.display = 'none';
                header.style.marginBottom = '0';
                if (label) label.innerHTML = 'AI 自动评论（已折叠）';
            } else {
                body.style.display = '';
                if (disclaimer) disclaimer.style.display = '';
                header.style.marginBottom = '12px';
                if (label) {
                    label.innerHTML = 'AI 自动评论 <span class="ai-badge">BETA</span>';
                }
            }
        });
    });

    console.log('📰 奥本海默组织新闻中心已就绪');
    console.log('🤖 AI自动评论系统 BETA 已激活');
    console.log('📋 共加载 ' + newsCards.length + ' 条新闻');
})();