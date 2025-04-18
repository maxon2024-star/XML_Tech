// pages/HomePage.js
import { ProductCardComponent } from '../components/ProductCardComponent.js';
import { ajax } from '../modules/ajax.js';
import { productUrls } from '../modules/productUrls.js';

export class HomePage {
    constructor(parent) {
        this.parent = parent;
        this.pageRoot = document.createElement('div');
        this.allItems = []; // Сохраняем оригинальные данные
        this.minPrice = 0;
        this.maxPrice = 0;
    }

    getData() {
        ajax.get(productUrls.getProducts(), (data) => {
            this.allItems = data;
            this.minPrice = Math.min(...data.map(p => p.price));
            this.maxPrice = Math.max(...data.map(p => p.price));
            this.renderPriceFilter();
            this.renderData(data); // Изначально показываем все
        });
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
            productCard.render(item, this.clickCard.bind(this), this.editProduct.bind(this), this.viewDetails.bind(this));
        });
    }

    clickCard(id) {
        if (id) window.location.hash = `#product/${id}`;
    }

    editProduct(id) {
        if (id) window.location.hash = `#edit/${id}`;
    }

    viewDetails(id) {
        if (id) window.location.hash = `#details/${id}`;
    }

    renderForm() {
        window.location.hash = '#create';
    }

    addProduct(product) {
        ajax.post(productUrls.createProduct(), product, (data, status) => {
            if (status === 201) {
                this.getData();
            }
        });
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