import { BackButtonComponent } from '../components/BackButtonComponent.js';
import { ajax } from '../modules/ajax.js';
import { productUrls } from '../modules/productUrls.js';

export class ProductDetailsPage {
    constructor(parent, id) {
        this.parent = parent;
        this.pageRoot = document.createElement('div');
        this.id = id;
    }

    getData() {
        if (!this.id) {
            console.error('Product ID is undefined');
            this.parent.innerHTML = '<h1>Product not found</h1>';
            return;
        }
        ajax.get(productUrls.getProductById(this.id), (data, status) => {
            if (status === 404) {
                this.parent.innerHTML = '<h1>Product not found</h1>';
            } else if (status === 200) {
                this.renderData(data);
            } else {
                console.error('Failed to fetch product:', status, data);
                this.parent.innerHTML = '<h1>Error loading product</h1>';
            }
        });
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
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = this.parent.querySelector('.back-button');
        if (backButton) {
            backButton.addEventListener('click', this.clickBack.bind(this));
        }
    }

    clickBack() {
        window.location.hash = '#';
    }

    render() {
        this.parent.innerHTML = '';
        const html = `<h1>Product Details</h1>`;
        this.parent.insertAdjacentHTML('beforeend', html);
        this.pageRoot = this.parent;
        this.getData();
    }
}