document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.getElementById('burgerMenu');
    const navContainer = document.querySelector('.nav-container');
    
    if (burgerMenu && navContainer) {
        burgerMenu.addEventListener('click', function() {
            burgerMenu.classList.toggle('active');
            navContainer.classList.toggle('active');
            
            // Блокировка прокрутки тела при открытом меню
            document.body.style.overflow = navContainer.classList.contains('active') ? 'hidden' : '';
        });
        
        // Закрытие меню при клике на ссылку
        const navLinks = document.querySelectorAll('.nav-container a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                burgerMenu.classList.remove('active');
                navContainer.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Закрытие меню при клике вне области
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-container') && 
                !event.target.closest('.burger-menu') &&
                navContainer.classList.contains('active')) {
                burgerMenu.classList.remove('active');
                navContainer.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Carousel functionality
    function initCarousels() {
        const carousels = document.querySelectorAll('.products-carousel');
        
        carousels.forEach(carousel => {
            const container = carousel.parentElement;
            const section = container.closest('section');
            const prevBtn = section.querySelector('.prev');
            const nextBtn = section.querySelector('.next');
            const items = carousel.querySelectorAll('.product-item.horizontal');
            const itemCount = items.length;
            
            let currentIndex = 0;
            const isMobile = window.innerWidth <= 768;
            const itemsPerView = isMobile ? 3 : 3; // Всегда показываем по 3 карточки
            
            function updateCarousel() {
                const isMobileNow = window.innerWidth <= 768;
                
                if (isMobileNow) {
                    // На мобильных - показываем группы по 3 карточки в столбик
                    const cardsPerGroup = 3;
                    const totalGroups = Math.ceil(itemCount / cardsPerGroup);
                    
                    // Скрываем все карточки
                    items.forEach(item => {
                        item.style.display = 'none';
                    });
                    
                    // Показываем только карточки текущей группы
                    const startIndex = currentIndex * cardsPerGroup;
                    const endIndex = Math.min(startIndex + cardsPerGroup, itemCount);
                    
                    for (let i = startIndex; i < endIndex; i++) {
                        if (items[i]) {
                            items[i].style.display = 'flex';
                        }
                    }
                    
                    // Обновляем состояние кнопок
                    if (prevBtn) {
                        prevBtn.disabled = currentIndex === 0;
                        prevBtn.style.display = 'block';
                    }
                    if (nextBtn) {
                        nextBtn.disabled = currentIndex >= totalGroups - 1;
                        nextBtn.style.display = 'block';
                    }
                    
                } else {
                    // На десктопе - горизонтальная карусель
                    const cardWidth = 320;
                    const gap = 20;
                    const translateX = -currentIndex * (cardWidth + gap) * itemsPerView;
                    carousel.style.transform = `translateX(${translateX}px)`;
                    
                    // Показываем все карточки на десктопе
                    items.forEach(item => {
                        item.style.display = 'flex';
                    });
                    
                    // Обновляем состояние кнопок
                    if (prevBtn) {
                        prevBtn.disabled = currentIndex === 0;
                        prevBtn.style.display = 'block';
                    }
                    if (nextBtn) {
                        nextBtn.disabled = currentIndex >= Math.ceil(itemCount / itemsPerView) - 1;
                        nextBtn.style.display = 'block';
                    }
                }
            }
            
            function nextSlide() {
                const isMobileNow = window.innerWidth <= 768;
                const cardsPerGroup = isMobileNow ? 3 : itemsPerView;
                const totalGroups = Math.ceil(itemCount / cardsPerGroup);
                
                if (currentIndex < totalGroups - 1) {
                    currentIndex++;
                    updateCarousel();
                }
            }
            
            function prevSlide() {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            }
            
            // Event listeners
            if (nextBtn) nextBtn.addEventListener('click', nextSlide);
            if (prevBtn) prevBtn.addEventListener('click', prevSlide);
            
            // Initialize - показываем первую группу карточек
            updateCarousel();
            
            // Handle window resize
            let resizeTimeout;
            window.addEventListener('resize', function() {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(function() {
                    const wasMobile = window.innerWidth <= 768;
                    const nowMobile = window.innerWidth <= 768;
                    
                    // Если переключились между мобильной и десктопной версией
                    if (wasMobile !== nowMobile) {
                        currentIndex = 0;
                        updateCarousel();
                    }
                }, 100);
            });
        });
    }
    
    // Initialize carousels
    initCarousels();

  // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.closest('.product-item') ? 
                this.closest('.product-item').querySelector('h3').textContent : 
                'Старинная лошадка-каталка';
            
            alert(`Товар "${productName}" добавлен в корзину!`);
            // Здесь можно добавить логику для реального добавления в корзину
        });
    });

    // Buy now functionality
    const buyNowButton = document.querySelector('.btn-buy-now');
    if (buyNowButton) {
        buyNowButton.addEventListener('click', function() {
            alert('Переходим к оформлению заказа!');
            // Здесь можно добавить логику для перехода к оформлению заказа
        });
    }
    // В конце файла script.js добавьте:
document.addEventListener('DOMContentLoaded', function() {
    // ... существующий код ...

    // Обработка клика по карточке товара
    const productLinks = document.querySelectorAll('.product-link');
    productLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Если клик был по кнопке "в корзину", не переходим по ссылке
            if (e.target.closest('.btn-add-to-cart')) {
                e.preventDefault();
                // Здесь можно добавить логику добавления в корзину
                const productName = this.querySelector('h3').textContent;
                alert(`Товар "${productName}" добавлен в корзину!`);
            }
        });
    });
});
});