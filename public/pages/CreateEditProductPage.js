import { ProductFormComponent } from '../components/ProductFormComponent.js';
import { BackButtonComponent } from '../components/BackButtonComponent.js';
import { ajax } from '../modules/ajax.js';
import { productUrls } from '../modules/productUrls.js';

export class CreateEditProductPage {
    constructor(parent, productId = null) {
        this.parent = parent;
        this.pageRoot = document.createElement('div');
        this.productId = productId;
    }

    addProduct(product) {
        ajax.post(productUrls.createProduct(), product, (data, status) => {
            if (status === 201) {
                window.location.hash = `#product/${data.id}`;
            }
        });
    }

    updateProduct(updatedProduct) {
        ajax.patch(productUrls.updateProductById(this.productId), updatedProduct, (data, status) => {
            if (status === 200) {
                window.location.hash = `#product/${data.id}`;
            }
        });
    }

    deleteProduct() {
        if (confirm('Are you sure you want to delete this product?')) {
            ajax.delete(productUrls.deleteProductById(this.productId), (data, status) => {
                if (status === 200 || status === 204) {
                    window.location.hash = '#';
                }
            });
        }
    }

    clickBack() {
        window.location.hash = '#';
    }

    render() {
        this.parent.innerHTML = '';
        this.pageRoot.innerHTML = `
            <div class="create-edit-form">
                <h1>${this.productId ? 'Редактировать продукт' : 'Создать новый продукт'}</h1>
                <div id="formContainer"></div>
                <div class="button-group">
                    <button id="backButton" class="back-button">Назад</button>
                    ${this.productId ? '<button id="deleteButton" class="delete-button">Удалить</button>' : ''}
                </div>
            </div>
        `;
        this.parent.appendChild(this.pageRoot);

        const formComponent = new ProductFormComponent(this.pageRoot.querySelector('#formContainer'));

        if (this.productId) {
            ajax.get(productUrls.getProductById(this.productId), (data) => {
                formComponent.render(this.updateProduct.bind(this), data);
            });
        } else {
            formComponent.render(this.addProduct.bind(this));
        }

        const backButton = this.pageRoot.querySelector('#backButton');
        if (backButton) {
            backButton.addEventListener('click', this.clickBack.bind(this));
        }

        const deleteButton = this.pageRoot.querySelector('#deleteButton');
        if (deleteButton) {
            deleteButton.addEventListener('click', this.deleteProduct.bind(this));
        }
    }
}
