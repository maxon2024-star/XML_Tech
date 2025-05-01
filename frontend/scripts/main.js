document.addEventListener('DOMContentLoaded', () => {
    const api = window.API;

    // Получение элементов DOM
    const productsContainer = document.getElementById('productsContainer');
    const addProductBtn = document.getElementById('addProductBtn');
    const minPriceSlider = document.getElementById('minPrice');
    const maxPriceSlider = document.getElementById('maxPrice');
    const minPriceValue = document.getElementById('minPriceValue');
    const maxPriceValue = document.getElementById('maxPriceValue');

    // Функция для обновления ценовых слайдеров
    function updatePriceRange() {
        const minPrice = parseInt(minPriceSlider.value, 10);
        const maxPrice = parseInt(maxPriceSlider.value, 10);
        minPriceValue.textContent = minPrice;
        maxPriceValue.textContent = maxPrice;
        fetchProducts(minPrice, maxPrice);
    }

    // Функция для получения продуктов
    function fetchProducts(minPrice = 0, maxPrice = 1000) {
        const url = `${API_BASE_URL}?price_gte=${minPrice}&price_lte=${maxPrice}`;
        api.get(url, (err, products) => {
            if (err) {
                console.error('Ошибка:', err.message);
                productsContainer.innerHTML = '<p>Error loading products. Please try again later.</p>';
                return;
            }
            renderProducts(products);
        });
    }

    // Функция для отображения продуктов
    function renderProducts(products) {
        productsContainer.innerHTML = '';
        if (products.length === 0) {
            productsContainer.innerHTML = '<p>Продукты не найдены</p>';
            return;
        }
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.src}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>Цена: $${product.price}</p>
                <div class="actions">
                    <button onclick="window.location.href='product-details.html?id=${product.id}'">Подробнее</button>
                    <button onclick="window.location.href='edit-product.html?id=${product.id}'">Редактировать</button>
                </div>
            `;
            productsContainer.appendChild(card);
        });
    }

    // Обработчик кнопки "Добавить"
    addProductBtn.addEventListener('click', () => {
        window.location.href = 'edit-product.html';
    });

    // Инициализация страницы
    fetchProducts();

    // Настройка слайдеров
    minPriceSlider.addEventListener('input', updatePriceRange);
    maxPriceSlider.addEventListener('input', updatePriceRange);
});