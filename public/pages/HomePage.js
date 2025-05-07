// pages/HomePage.js
import { ProductCardComponent } from '../components/ProductCardComponent.js';
import { productUrls } from '../modules/productUrls.js';

export class HomePage {
    constructor(parent) {
        this.parent = parent;
        this.pageRoot = document.createElement('div');
        this.allItems = []; // Сохраняем оригинальные данные
        this.minPrice = 0;
        this.maxPrice = 0;
        this.currentMinPrice = 0;
        this.currentMaxPrice = 0;
    }

    async getData(minPrice = null, maxPrice = null) {
        let url = productUrls.getProducts();
        
        // Добавляем параметры фильтрации, если они заданы
        const params = new URLSearchParams();
        if (minPrice !== null) params.append('price_gte', minPrice);
        if (maxPrice !== null) params.append('price_lte', maxPrice);
        
        if (params.toString()) url += `?${params.toString()}`;

        try {
            const response = await fetch(url, {
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            this.allItems = data; // Сохраняем оригинальные данные
            // При первом запросе (без фильтров) определяем диапазон цен
            if (minPrice === null && maxPrice === null) {
                this.minPrice = Math.min(...data.map(p => p.price));
                this.maxPrice = Math.max(...data.map(p => p.price));
                this.currentMinPrice = this.minPrice;
                this.currentMaxPrice = this.maxPrice;
                this.renderPriceFilter();
            }
            this.renderData(data);
        } catch (error) {
            console.error('Error fetching products:', error);
            this.pageRoot.innerHTML = '<p>Ошибка загрузки товаров</p>';
        }
    }

    renderPriceFilter() {
        // Проверяем, существует ли уже элемент фильтра
        const existingFilter = document.getElementById('priceFilter');
        if (existingFilter) {
            existingFilter.remove(); // Удаляем существующий фильтр
        }

        const filterHtml = `
            <div id="priceFilter" class="price-filter">
                <label><strong>Диапазон цен:</strong></label>
                <div class="price-slider-row">
                    <input type="number" id="minPriceInput" min="${this.minPrice}" max="${this.maxPrice}" 
                           value="${this.currentMinPrice}" class="price-input">
                    <input type="range" id="rangeMin" min="${this.minPrice}" max="${this.maxPrice}" 
                           value="${this.currentMinPrice}" step="1" class="slider">
                    <span>до</span>
                    <input type="range" id="rangeMax" min="${this.minPrice}" max="${this.maxPrice}" 
                           value="${this.currentMaxPrice}" step="1" class="slider">
                    <input type="number" id="maxPriceInput" min="${this.minPrice}" max="${this.maxPrice}" 
                           value="${this.currentMaxPrice}" class="price-input">
                </div>
                <div class="filter-button-container">
                    <button id="applyPriceFilter" class="apply-filter-btn">Применить фильтр</button>
                    <button id="resetPriceFilter" class="reset-filter-btn" style="margin-left: 10px;">Сбросить</button>
                </div>
            </div>
        `;
        this.parent.insertAdjacentHTML('afterbegin', filterHtml);
    
        const rangeMin = document.getElementById('rangeMin');
        const rangeMax = document.getElementById('rangeMax');
        const minInput = document.getElementById('minPriceInput');
        const maxInput = document.getElementById('maxPriceInput');
        const applyBtn = document.getElementById('applyPriceFilter');
        const resetBtn = document.getElementById('resetPriceFilter');
    
        // Синхронизация между range и number
        const syncInputs = () => {
            minInput.addEventListener('input', () => {
                rangeMin.value = minInput.value;
            });
            maxInput.addEventListener('input', () => {
                rangeMax.value = maxInput.value;
            });
            rangeMin.addEventListener('input', () => {
                minInput.value = rangeMin.value;
            });
            rangeMax.addEventListener('input', () => {
                maxInput.value = rangeMax.value;
            });
        };
    
        syncInputs();
    
        applyBtn.addEventListener('click', () => {
            let min = parseInt(minInput.value) || this.minPrice;
            let max = parseInt(maxInput.value) || this.maxPrice;
            // Корректировка значений
            min = Math.max(min, this.minPrice);
            max = Math.min(max, this.maxPrice);
            if (min > max) [min, max] = [max, min];
    
            this.currentMinPrice = min;
            this.currentMaxPrice = max;
            this.getData(min, max);
        });

        resetBtn.addEventListener('click', () => {
            this.currentMinPrice = this.minPrice;
            this.currentMaxPrice = this.maxPrice;
            minInput.value = this.minPrice;
            maxInput.value = this.maxPrice;
            rangeMin.value = this.minPrice;
            rangeMax.value = this.maxPrice;
            this.getData(this.minPrice, this.maxPrice);
        });
    }
    
    renderData(items) {
        this.pageRoot.innerHTML = '';
        
        if (!items || items.length === 0) {
            this.pageRoot.innerHTML = '<p>Товары не найдены</p>';
            return;
        }
        
        const container = document.createElement('div');
        container.className = 'product-list-container';
        this.pageRoot.appendChild(container);
        
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
            const response = await fetch(productUrls.updateProductById(updatedProduct.id), {
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
            <div class="add-button-container">
                <button class="add-btn">Добавить продукт</button>
            </div>
            <div id="productList"></div>
        `;
        this.parent.insertAdjacentHTML('beforeend', html);
        this.pageRoot = document.getElementById('productList');
        this.getData(); // Первоначальная загрузка данных
    
        const addButton = this.parent.querySelector('.add-btn');
        addButton.addEventListener('click', () => {
            this.renderForm();
        });
    }
}