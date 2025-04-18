// pages/HomePage.js
import { ProductCardComponent } from '../components/ProductCardComponent.js';
import { BackButtonComponent } from '../components/BackButtonComponent.js'; // Импортируем компонент кнопки назад
import { CreateEditProductPage } from '../pages/CreateEditProductPage.js'; // Импортируем страницу создания и редактирования
import { ProductDetailsPage } from '../pages/ProductDetailsPage.js'; // Импортируем страницу подробной информации
import { productUrls } from '../modules/productUrls.js';

export class HomePage {
    constructor(parent) {
        this.parent = parent;
        this.pageRoot = document.createElement('div');
        this.allItems = []; // Сохраняем оригинальные данные
        this.minPrice = 0;
        this.maxPrice = 0;
    }

    async getData() {
        try {
            const response = await fetch(productUrls.getProducts());
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            this.allItems = data;
            this.minPrice = Math.min(...data.map(p => p.price));
            this.maxPrice = Math.max(...data.map(p => p.price));
            this.renderPriceFilter();
            this.renderData(data); // Изначально показываем все
        } catch (error) {
            console.error('Failed to fetch products:', error);
            this.parent.innerHTML = '<h1>Error loading products</h1>';
        }
    }

    renderPriceFilter() {
        const filterHtml = `
            <div id="priceFilter" class="price-filter">
                <label><strong>Диапазон цен:</strong></label><br>
                <div style="display: flex; justify-content: center; gap: 10px; align-items: center; flex-wrap: wrap;">
                    <input type="number" id="minPriceInput" min="${this.minPrice}" max="${this.maxPrice}" value="${this.minPrice}" class="price-input">
                    <input type="range" id="minPrice" min="${this.minPrice}" max="${this.maxPrice}" value="${this.minPrice}" step="1" class="slider">
                    <span>до</span>
                    <input type="range" id="maxPrice" min="${this.minPrice}" max="${this.maxPrice}" value="${this.maxPrice}" step="1" class="slider">
                    <input type="number" id="maxPriceInput" min="${this.minPrice}" max="${this.maxPrice}" value="${this.maxPrice}" class="price-input">
                </div>
            </div>
        `;
        this.pageRoot.insertAdjacentHTML('beforebegin', filterHtml);
    
        const minRange = document.getElementById('minPrice');
        const maxRange = document.getElementById('maxPrice');
        const minInput = document.getElementById('minPriceInput');
        const maxInput = document.getElementById('maxPriceInput');
    
        const updateAll = (min, max) => {
            if (min > max) [min, max] = [max, min];
    
            minRange.value = min;
            maxRange.value = max;
            minInput.value = min;
            maxInput.value = max;
    
            const filteredItems = this.allItems.filter(item => item.price >= min && item.price <= max);
            this.renderData(filteredItems);
        };
    
        const onInputChange = () => {
            let min = parseInt(minRange.value);
            let max = parseInt(maxRange.value);
            updateAll(min, max);
        };
    
        const onNumberChange = () => {
            let min = parseInt(minInput.value) || this.minPrice;
            let max = parseInt(maxInput.value) || this.maxPrice;
            updateAll(min, max);
        };
    
        minRange.addEventListener('input', onInputChange);
        maxRange.addEventListener('input', onInputChange);
        minInput.addEventListener('input', onNumberChange);
        maxInput.addEventListener('input', onNumberChange);
    }
    
    renderData(items) {
        this.pageRoot.innerHTML = ''; // Очищаем перед новым рендером
        const containerHtml = `
            <div class="product-list-container">
                <!-- Карточки продуктов будут вставляться сюда -->
            </div>
        `;
        this.pageRoot.insertAdjacentHTML('beforeend', containerHtml);
        const container = this.pageRoot.querySelector('.product-list-container');
        items.forEach((item) => {
            const productCard = new ProductCardComponent(container);
            productCard.render(item, this.editProduct.bind(this), this.viewDetails.bind(this));
        });
    }

    editProduct(id) {
        console.log('Edit Product ID:', id); // Добавлено для отладки
        if (id) {
            window.location.hash = `#edit/${id}`;
        } else {
            console.error('Product ID is undefined');
        }
    }

    viewDetails(id) {
        console.log('View Details Product ID:', id); // Добавлено для отладки
        if (id) {
            window.location.hash = `#details/${id}`;
        } else {
            console.error('Product ID is undefined');
        }
    }

    renderForm() {
        window.location.hash = '#create';
    }

    async addProduct(product) {
        try {
            const response = await fetch(productUrls.createProduct(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            window.location.hash = `#product/${data.id}`;
        } catch (error) {
            console.error('Failed to add product:', error);
        }
    }

    async updateProduct(updatedProduct) {
        try {
            const response = await fetch(productUrls.updateProductById(this.productId), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProduct)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            window.location.hash = `#product/${data.id}`;
        } catch (error) {
            console.error('Failed to update product:', error);
        }
    }

    async deleteProduct(id) {
        try {
            const response = await fetch(productUrls.removeProductById(id), {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            window.location.hash = '#';
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    }

    render() {
        this.parent.innerHTML = '';
        const html = `
            <h1>Продукты</h1>
            <button id="addProductBtn">Добавить продукт</button>
            <div id="productList"></div>
        `;
        this.parent.insertAdjacentHTML('beforeend', html);
        this.pageRoot = document.getElementById('productList');
        this.getData();

        const addButton = document.getElementById('addProductBtn');
        addButton.addEventListener('click', () => {
            this.renderForm();
        });
    }
}