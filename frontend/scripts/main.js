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

    // Функция для получения всех продуктов
    function fetchProducts(minPrice = 0, maxPrice = 1000) {
        const url = `${API_BASE_URL}?price_gte=${minPrice}&price_lte=${maxPrice}`;
        api.get(url, (err, products) => {
            if (err) {
                console.error('Ошибка:', err.message);
                productsContainer.innerHTML = 'Не удалось загрузить продукты';
                return;
            }
            renderProducts(products);
        });
    }

    // Функция для отображения продуктов
    function renderProducts(products) {
        productsContainer.innerHTML = '';
        if (products.length === 0) {
            productsContainer.innerHTML = 'Продукты не найдены';
            return;
        }
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <p>Цена: $${product.price}</p>
                <button onclick="window.location.href='product-details.html?id=${product.id}'">Подробнее</button>
                <button onclick="window.location.href='edit-product.html?id=${product.id}'">Редактировать</button>
                <button onclick="deleteProduct(${product.id})">Удалить</button>
            `;
            productsContainer.appendChild(card);
        });
    }

    // Функция для удаления продукта
    function deleteProduct(id) {
        const url = `${API_BASE_URL}/${id}`;
        api.del(url, (err) => {
            if (err) {
                alert(err.message);
                return;
            }
            fetchProducts();
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