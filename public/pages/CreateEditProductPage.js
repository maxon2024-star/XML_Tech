// pages/CreateEditProductPage.js
import { ProductFormComponent } from '../components/ProductFormComponent.js';
import { BackButtonComponent } from '../components/BackButtonComponent.js'; // Импортируем компонент кнопки назад
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
                window.location.hash = `#details/${data.id}`;
            }
        });
    }

    updateProduct(updatedProduct) {
        ajax.patch(productUrls.updateProductById(this.productId), updatedProduct, (data, status) => {
            if (status === 200) {
                window.location.hash = `#details/${data.id}`;
            }
        });
    }

    clickBack() {
        window.location.hash = ''; // Возвращаемся на главную страницу
    }

    // Измененный метод render в CreateEditProductPage.js

    render() {
        this.parent.innerHTML = '';
        
        const html = `
            <div class="create-edit-form">
                <h1>${this.productId ? 'Редактировать продукт' : 'Создать продукт'}</h1>
                <div class="form-container"></div>
                <div class="form-actions"></div>
                <div class="form-footer"></div>
            </div>
        `;
        this.parent.insertAdjacentHTML('beforeend', html);
        this.pageRoot = this.parent.querySelector('.create-edit-form');
        
        const formContainer = this.pageRoot.querySelector('.form-container');
        const form = new ProductFormComponent(formContainer);
        
        if (this.productId) {
            this.fetchProduct(this.productId, form);
        } else {
            form.render(this.addProduct.bind(this));
            this.renderBackButton();
        }
    }
    
    renderDeleteButton() {
        const formActions = this.pageRoot.querySelector('.form-actions');
        formActions.innerHTML = '';
        
        // Кнопка Обновить уже есть в форме, нам нужно добавить Удалить рядом
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            if (confirm('Вы уверены, что хотите удалить продукт?')) {
                ajax.delete(productUrls.removeProductById(this.productId), (data, status) => {
                    if (status === 200 || status === 204) {
                        window.location.hash = '';
                    }
                });
            }
        });
        
        formActions.appendChild(deleteButton);
        
        // Переносим кнопку Назад в футер
        this.renderBackButton();
    }
    
    renderBackButton() {
        const formFooter = this.pageRoot.querySelector('.form-footer');
        formFooter.innerHTML = '';
        
        const backButton = document.createElement('button');
        backButton.textContent = 'Назад';
        backButton.classList.add('back-button');
        backButton.addEventListener('click', this.clickBack.bind(this));
        formFooter.appendChild(backButton);
    }
    
    fetchProduct(id, form) {
        ajax.get(productUrls.getProductById(id), (data) => {
            form.render(this.updateProduct.bind(this), data, true);
            this.renderDeleteButton();
        });
    }
    
}