document.addEventListener('DOMContentLoaded', () => {
    // Элементы
    const carousel = document.getElementById('carousel');
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    const priceButtons = document.querySelectorAll('.pricing-btn');

    // Состояние
    let currentIndex = 0;
    let startX = 0;
    let endX = 0;
    let isDragging = false;
    let autoSlideInterval;

    // Создать индикаторы
    createIndicators();
    updateIndicators();

    // Инициализация автопрокрутки
    startAutoSlide();

    // СОБЫТИЯ МЫШИ
    // Начало перетаскивания
    carousel.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX;
        carousel.style.cursor = 'grabbing';
        stopAutoSlide();
    });

    // Движение мыши
    carousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        endX = e.pageX;
    });

    // Конец перетаскивания
    carousel.addEventListener('mouseup', () => {
        if (!isDragging) return;

        isDragging = false;
        carousel.style.cursor = 'grab';

        const diff = startX - endX;

        // Если двигали больше 50 пикселей
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        } else {
            // Возврат к текущему слайду
            goToSlide(currentIndex);
        }

        startAutoSlide();
    });

    // Выход за пределы карусели
    carousel.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            carousel.style.cursor = 'grab';
            goToSlide(currentIndex);
            startAutoSlide();
        }
    });

    // СОБЫТИЯ ТАЧ (смартфоны)
    // Начало тача
    carousel.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        stopAutoSlide();
    });

    // Движение пальцем
    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        endX = e.touches[0].clientX;
    });

    // Конец тача
    carousel.addEventListener('touchend', () => {
        if (!isDragging) return;

        isDragging = false;

        const diff = startX - endX;

        // Если двигали больше 50 пикселей
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        } else {
            // Возврат к текущему слайду
            goToSlide(currentIndex);
        }

        startAutoSlide();
    });

    // ФУНКЦИИ КАРУСЕЛИ
    // Показать слайд
    function goToSlide(index) {
        // Ограничить индекс
        if (index < 0) index = 0;
        if (index >= totalItems) index = totalItems - 1;

        currentIndex = index;
        const offset = -currentIndex * 100;
        carousel.style.transform = `translateX(${offset}%)`;

        updateIndicators();
    }

    // Следующий слайд
    function nextSlide() {
        if (currentIndex < totalItems - 1) {
            currentIndex++;
            goToSlide(currentIndex);
        }
    }

    // Предыдущий слайд
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            goToSlide(currentIndex);
        }
    }

    // Автопрокрутка
    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(() => {
            if (currentIndex < totalItems - 1) {
                nextSlide();
            } else {
                // Возврат к началу
                setTimeout(() => {
                    goToSlide(0);
                }, 500);
            }
        }, 5000);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }

    // Индикаторы
    function createIndicators() {
        const indicatorsContainer = document.getElementById('indicators');

        for (let i = 0; i < totalItems; i++) {
            const indicator = document.createElement('span');
            indicator.addEventListener('click', () => {
                stopAutoSlide();
                goToSlide(i);
                startAutoSlide();
            });
            indicatorsContainer.appendChild(indicator);
        }
    }

    function updateIndicators() {
        const indicators = document.querySelectorAll('.carousel-indicators span');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    // Остановка автопрокрутки при наведении
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);

    // ЛОГИКА ЦЕН
    // Обработчики кнопок
    priceButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Удаляем активный класс у всех кнопок
            priceButtons.forEach(btn => btn.classList.remove('active'));

            // Добавляем активный класс кнопке
            button.classList.add('active');

            // Получаем цены
            const priceData = button.getAttribute('data-prices').split(',');

            // Обновляем цены
            document.getElementById('price1').textContent = `${priceData[0]} ₽`;
            document.getElementById('price2').textContent = `${priceData[1]} ₽`;
            document.getElementById('price3').textContent = `${priceData[2]} ₽`;
        });
    });

    console.log('🎮 Карусель и цены готовы!');
});

// Обработчик кликов на карточки PS Plus
document.querySelectorAll('.pricing-card').forEach((card, index) => {
    card.addEventListener('click', () => {
        const planType = index === 0 ? 'essential' :
                         index === 1 ? 'extra' : 'deluxe';

        // Получаем текущий период
        const activeBtn = document.querySelector('.pricing-btn.active');
        const period = activeBtn.textContent.includes('1 месяц') ? '1' :
                       activeBtn.textContent.includes('3 месяца') ? '3' : '12';

        // Переходим на страницу товара
        window.location.href = `product.html?plan=${planType}&period=${period}`;
    });
});