document.addEventListener('DOMContentLoaded', () => {
    const apiBaseUrl = 'http://localhost:3000/products';
    // Получение элементов DOM
    const productsContainer = document.getElementById('productsContainer');
    const addProductBtn = document.getElementById('addProductBtn');
    const minPriceSlider = document.getElementById('minPrice');
    const maxPriceSlider = document.getElementById('maxPrice');
    const minPriceValue = document.getElementById('minPriceValue');
    const maxPriceValue = document.getElementById('maxPriceValue');
    const editProductForm = document.getElementById('editProductForm');
    // Обработчики событий для слайдеров
    if (minPriceSlider && maxPriceSlider) {
        minPriceSlider.addEventListener('input', updatePriceRange);
        maxPriceSlider.addEventListener('input', updatePriceRange);
    }
    // Функция для обновления значений слайдеров
    function updatePriceRange() {
        const minPrice = parseInt(minPriceSlider.value, 10);
        const maxPrice = parseInt(maxPriceSlider.value, 10);
        minPriceValue.textContent = minPrice;
        maxPriceValue.textContent = maxPrice;
        fetchProducts(minPrice, maxPrice);
    }
    // Функция для получения продуктов с учетом фильтрации по цене
    async function fetchProducts(minPrice = 0, maxPrice = 1000) {
        try {
            const response = await fetch(`${apiBaseUrl}?price_gte=${minPrice}&price_lte=${maxPrice}`);
            const products = await response.json();
            renderProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
            productsContainer.innerHTML = '<p>Error loading products. Please try again later.</p>';
        }
    }
    // Функция для отображения продуктов
    function renderProducts(products) {
        productsContainer.innerHTML = '';
        if (products.length === 0) {
            productsContainer.innerHTML = '<p>No products found.</p>';
            return;
        }
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.src}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>Цена: $${product.price}</p>
                <div class="actions">
                    <button class="edit" data-id="${product.id}">Редактировать</button>
                    <button class="view" data-id="${product.id}">Подробнее</button>
                </div>
            `;
            productsContainer.appendChild(productCard);
        });
        // Добавление обработчиков событий для кнопок
        const editButtons = document.querySelectorAll('.product-card .actions .edit');
        editButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-id');
                window.location.href = `edit-product.html?id=${productId}`;
            });
        });
        const viewButtons = document.querySelectorAll('.product-card .actions .view');
        viewButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-id');
                window.location.href = `product-details.html?id=${productId}`;
            });
        });
    }
    // Функция для удаления продукта
    async function deleteProduct(id) {
        try {
            const response = await fetch(`${apiBaseUrl}/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchProducts();
            } else {
                console.error('Error deleting product:', response.statusText);
                alert('Error deleting product. Please try again later.');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Error deleting product. Please try again later.');
        }
    }
    // Обработчик события для добавления нового продукта
    if (addProductBtn) {
        addProductBtn.addEventListener('click', () => {
            window.location.href = 'edit-product.html';
        });
    }
    // Инициализация страницы
    fetchProducts();
    // Функция для получения минимальной и максимальной цены
    async function fetchMinMaxPrices() {
        try {
            const response = await fetch(apiBaseUrl);
            const products = await response.json();
            if (products.length === 0) return { min: 0, max: 1000 };
            const prices = products.map(product => product.price);
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            return { min: minPrice, max: maxPrice };
        } catch (error) {
            console.error('Error fetching min/max prices:', error);
            return { min: 0, max: 1000 };
        }
    }
    // Установка начальных значений слайдеров
    fetchMinMaxPrices().then(({ min, max }) => {
        if (minPriceSlider && maxPriceSlider && minPriceValue && maxPriceValue) {
            minPriceSlider.min = min;
            minPriceSlider.max = max;
            maxPriceSlider.min = min;
            maxPriceSlider.max = max;
            minPriceSlider.value = min;
            maxPriceSlider.value = max;
            minPriceValue.textContent = min;
            maxPriceValue.textContent = max;
            fetchProducts(min, max);
        }
    });
    // Обработка формы редактирования продукта
    if (editProductForm) {
        const productIdInput = document.getElementById('productId');
        const srcInput = document.getElementById('src');
        const titleInput = document.getElementById('title');
        const descriptionInput = document.getElementById('description');
        const priceInput = document.getElementById('price');
        const deleteBtn = document.getElementById('deleteBtn');
        const backBtn = document.getElementById('backBtn');
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        
        // Изменение заголовка страницы
        const pageTitle = document.querySelector('h1');
        if (productId) {
            pageTitle.textContent = 'Редактировать продукт';
            // Показываем кнопку "Удалить" только при редактировании
            deleteBtn.classList.remove('hidden');
        } else {
            pageTitle.textContent = 'Добавить новый продукт';
            // Скрываем кнопку "Удалить" при создании нового продукта
            deleteBtn.classList.add('hidden');
        }
        if (productId) {
            // Редактирование существующего продукта
            fetch(`${apiBaseUrl}/${productId}`)
                .then(response => response.json())
                .then(product => {
                    if (product) {
                        productIdInput.value = product.id;
                        srcInput.value = product.src;
                        titleInput.value = product.title;
                        descriptionInput.value = product.description;
                        priceInput.value = product.price;
                    } else {
                        console.error('Product not found:', product);
                        alert('Product not found. Please try again later.');
                        window.location.href = 'index.html';
                    }
                })
                .catch(error => {
                    console.error('Error fetching product:', error);
                    alert('Error fetching product. Please try again later.');
                    window.location.href = 'index.html';
                });
        }
        editProductForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const productData = {
                src: srcInput.value,
                title: titleInput.value,
                description: descriptionInput.value,
                price: parseFloat(priceInput.value),
            };
            if (productId) {
                // Обновление существующего продукта
                try {
                    const response = await fetch(`${apiBaseUrl}/${productId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(productData),
                    });
                    if (response.ok) {
                        window.location.href = 'index.html';
                    } else {
                        console.error('Error updating product:', response.statusText);
                        alert('Error updating product. Please try again later.');
                    }
                } catch (error) {
                    console.error('Error updating product:', error);
                    alert('Error updating product. Please try again later.');
                }
            } else {
                // Создание нового продукта
                try {
                    const response = await fetch(apiBaseUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(productData),
                    });
                    if (response.ok) {
                        window.location.href = 'index.html';
                    } else {
                        console.error('Error creating product:', response.statusText);
                        alert('Error creating product. Please try again later.');
                    }
                } catch (error) {
                    console.error('Error creating product:', error);
                    alert('Error creating product. Please try again later.');
                }
            }
        });
        // Обработчик события для кнопки "Удалить"
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                if (productId) {
                    deleteProduct(productId);
                } else {
                    alert('Product ID not found. Cannot delete product.');
                }
            });
        }
        // Обработчик события для кнопки "Назад"
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                window.location.href = 'index.html';
            });
        }
    }
    // Обработка страницы с подробной информацией о продукте
    const productDetailsDiv = document.getElementById('productDetails');
    if (productDetailsDiv) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        if (productId) {
            fetch(`${apiBaseUrl}/${productId}`)
                .then(response => response.json())
                .then(product => {
                    productDetailsDiv.innerHTML = `
                        <img src="${product.src}" alt="${product.title}">
                        <h2>${product.title}</h2>
                        <p>${product.description}</p>
                        <p>Цена: $${product.price}</p>
                    `;
                })
                .catch(error => {
                    console.error('Error fetching product:', error);
                    productDetailsDiv.innerHTML = '<p>Error loading product details. Please try again later.</p>';
                });
        }
        const backBtn = document.getElementById('backBtn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                window.location.href = 'index.html';
            });
        }
    }
});