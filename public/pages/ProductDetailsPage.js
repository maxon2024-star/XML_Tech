// pages/ProductDetailsPage.js
import { ProductCardComponent } from '../components/ProductCardComponent.js';
import { BackButtonComponent } from '../components/BackButtonComponent.js'; // Импортируем компонент кнопки назад
import { productUrls } from '../modules/productUrls.js';

export class ProductDetailsPage {
    constructor(parent, id) {
        this.parent = parent;
        this.pageRoot = document.createElement('div');
        this.id = id;
    }

    async getData() {
        try {
            const response = await fetch(productUrls.getProductById(this.id));
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            this.renderData(data);
        } catch (error) {
            console.error('Failed to fetch product:', error);
            this.parent.innerHTML = '<h1>Product not found</h1>';
        }
    }

    renderData(item) {
        const html = `
            <div class="product-details">
                <img src="${item.src}" alt="${item.title}" class="product-image">
                <h2 class="product-title">${item.title}</h2>
                <p class="product-description">${item.description}</p>
                <p class="product-price">Price: $${item.price}</p>
                <button id="backButton" class="back-button">Back</button>
            </div>
        `;
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = this.parent.querySelector('.back-button');
        if (backButton) {
            backButton.addEventListener('click', this.clickBack.bind(this));
        }
    }

    clickBack() {
        window.location.hash = '#'; // Возвращаемся на главную страницу
    }

    render() {
        this.parent.innerHTML = '';
        const html = `<h1>Product Details</h1>`;
        this.parent.insertAdjacentHTML('beforeend', html);
        this.pageRoot = this.parent;
        this.getData();
    }
}