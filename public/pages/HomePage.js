// pages/HomePage.js
import { ProductCardComponent } from '../components/ProductCardComponent.js';
import { ajax } from '../modules/ajax.js';
import { productUrls } from '../modules/productUrls.js';

export class HomePage {
    constructor(parent) {
        this.parent = parent;
        this.pageRoot = document.createElement('div');
        this.minPrice = 0;
        this.maxPrice = 0;
        this.currentMinPrice = 0;
        this.currentMaxPrice = 0;
    }

    getData(minPrice = null, maxPrice = null) {
        let url = productUrls.getProducts();
        
        // Добавляем параметры фильтрации, если они заданы
        const params = new URLSearchParams();
        if (minPrice !== null) params.append('price_gte', minPrice);
        if (maxPrice !== null) params.append('price_lte', maxPrice);
        
        if (params.toString()) url += `?${params.toString()}`;

        ajax.get(url, (data, status) => {
            if (status === 200) {
                // При первом запросе (без фильтров) определяем диапазон цен
                if (minPrice === null && maxPrice === null) {
                    this.minPrice = Math.min(...data.map(p => p.price));
                    this.maxPrice = Math.max(...data.map(p => p.price));
                    this.currentMinPrice = this.minPrice;
                    this.currentMaxPrice = this.maxPrice;
                    this.renderPriceFilter();
                }
                this.renderData(data);
            } else {
                console.error('Error fetching products:', status);
                this.pageRoot.innerHTML = '<p>Ошибка загрузки товаров</p>';
            }
        });
    }

    renderPriceFilter() {
        const filterHtml = `
            <div id="priceFilter" class="price-filter">
                <label><strong>Диапазон цен:</strong></label>
                <div class="price-slider-row">
                    <input type="number" id="minPriceInput" min="${this.minPrice}" max="${this.maxPrice}" 
                           value="${this.currentMinPrice}" class="price-input">
                    <input type="range" id="rangeMin" min="${this.minPrice}" max="${this.maxPrice}" 
                           value="${this.currentMinPrice}" class="slider">
                    <span> </span>
                    <input type="range" id="rangeMax" min="${this.minPrice}" max="${this.maxPrice}" 
                           value="${this.currentMaxPrice}" class="slider">
                    <input type="number" id="maxPriceInput" min="${this.minPrice}" max="${this.maxPrice}" 
                           value="${this.currentMaxPrice}" class="price-input">
                </div>
                <div class="filter-button-container">
                    <button id="applyPriceFilter" class="apply-filter-btn">Применить фильтр</button>
                </div>
            </div>
        `;
        this.pageRoot.insertAdjacentHTML('beforebegin', filterHtml);
    
        const rangeMin = document.getElementById('rangeMin');
        const rangeMax = document.getElementById('rangeMax');
        const minInput = document.getElementById('minPriceInput');
        const maxInput = document.getElementById('maxPriceInput');
        const applyBtn = document.getElementById('applyPriceFilter');
    
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
            if (min > max) [min, max] = [max, min];
    
            this.currentMinPrice = min;
            this.currentMaxPrice = max;
            this.getData(min, max);
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
        if (id) {
            window.location.hash = `#edit/${id}`;
        } else {
            console.error('Product ID is undefined');
        }
    }

    viewDetails(id) {
        if (id) {
            window.location.hash = `#details/${id}`;
        } else {
            console.error('Product ID is undefined');
        }
    }

    renderForm() {
        window.location.hash = '#create';
    }

    render() {
        this.parent.innerHTML = '';
        const html = `
            <h1>Список товаров</h1>
            <div class="add-button-container">
                <button class="add-btn">Добавить товар</button>
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