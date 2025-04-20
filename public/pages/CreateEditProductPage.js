// pages/CreateEditProductPage.js
import { ProductFormComponent } from '../components/ProductFormComponent.js';
import { BackButtonComponent } from '../components/BackButtonComponent.js'; // Импортируем компонент кнопки назад
import { productUrls } from '../modules/productUrls.js';

export class CreateEditProductPage {
    constructor(parent, productId = null) {
        this.parent = parent;
        this.pageRoot = document.createElement('div');
        this.productId = productId;
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
            window.location.hash = `#details/${data.id}`;
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
            window.location.hash = `#details/${data.id}`;
        } catch (error) {
            console.error('Failed to update product:', error);
        }
    }

    clickBack() {
        window.location.hash = '#'; // Возвращаемся на главную страницу
    }

    render() {
    this.parent.innerHTML = '';

    const html = `
        <div class="create-edit-form">
            <h1>${this.productId ? 'Редактировать продукт' : 'Создать продукт'}</h1>
        </div>
    `;
    this.parent.insertAdjacentHTML('beforeend', html);
    this.pageRoot = this.parent.querySelector('.create-edit-form');

    // Рендерим форму
    const form = new ProductFormComponent(this.pageRoot);
    if (this.productId) {
        this.fetchProduct(this.productId, form);
    } else {
        form.render(this.addProduct.bind(this));
    }

    // Используем BackButtonComponent
    const backButton = new BackButtonComponent(this.pageRoot);
    backButton.render(this.clickBack.bind(this));
}

    async fetchProduct(id, form) {
        try {
            const response = await fetch(productUrls.getProductById(id));
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            form.render(this.updateProduct.bind(this), data, this.deleteProduct.bind(this));
        } catch (error) {
            console.error('Failed to fetch product:', error);
            this.parent.innerHTML = '<h1>Product not found</h1>';
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
    
}