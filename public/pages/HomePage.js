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
                <label><strong>Диапазон цен:</strong></label>
                <div class="price-slider-row">
                    <input type="number" id="minPriceInput" min="${this.minPrice}" max="${this.maxPrice}" value="${this.minPrice}" class="price-input">
                    <input type="range" id="rangeMin" min="${this.minPrice}" max="${this.maxPrice}" value="${this.minPrice}" class="slider">
                    <span> </span>
                    <input type="range" id="rangeMax" min="${this.minPrice}" max="${this.maxPrice}" value="${this.maxPrice}" class="slider">
                    <input type="number" id="maxPriceInput" min="${this.minPrice}" max="${this.maxPrice}" value="${this.maxPrice}" class="price-input">
                </div>
            </div>
        `;
        this.pageRoot.insertAdjacentHTML('beforebegin', filterHtml);
    
        const rangeMin = document.getElementById('rangeMin');
        const rangeMax = document.getElementById('rangeMax');
        const minInput = document.getElementById('minPriceInput');
        const maxInput = document.getElementById('maxPriceInput');
    
        const updateAll = (min, max) => {
            if (min > max) [min, max] = [max, min];
    
            rangeMin.value = min;
            rangeMax.value = max;
            minInput.value = min;
            maxInput.value = max;
    
            const filteredItems = this.allItems.filter(item => item.price >= min && item.price <= max);
            this.renderData(filteredItems);
        };
    
        const onSliderChange = () => {
            let min = parseInt(rangeMin.value);
            let max = parseInt(rangeMax.value);
            updateAll(min, max);
        };
    
        const onInputChange = () => {
            let min = parseInt(minInput.value) || this.minPrice;
            let max = parseInt(maxInput.value) || this.maxPrice;
            updateAll(min, max);
        };
    
        rangeMin.addEventListener('input', onSliderChange);
        rangeMax.addEventListener('input', onSliderChange);
        minInput.addEventListener('input', onInputChange);
        maxInput.addEventListener('input', onInputChange);
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

    addProduct(product) {
        ajax.post(productUrls.createProduct(), product, (data, status) => {
            if (status === 201) {
                window.location.hash = `#details/${data.id}`;
            }
        });
    }

    render() {
        this.parent.innerHTML = '';
        const html = `
            <h1>Products</h1>
            <div class="add-button-container">
                <button class="add-btn">Добавить продукт</button>
            </div>
            <div id="productList"></div>
        `;
        this.parent.insertAdjacentHTML('beforeend', html);
        this.pageRoot = document.getElementById('productList');
        this.getData();
    
        const addButton = this.parent.querySelector('.add-btn'); // Ищем по классу
        addButton.addEventListener('click', () => {
            this.renderForm();
        });
    }
}