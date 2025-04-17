import { ProductCardComponent } from '../components/ProductCardComponent.js';
import { BackButtonComponent } from '../components/BackButtonComponent.js';
import { ProductFormComponent } from '../components/ProductFormComponent.js';
import { ajax } from '../modules/ajax.js';
import { productUrls } from '../modules/productUrls.js';

export class ProductPage {
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
        const productCard = new ProductCardComponent(this.pageRoot);
        productCard.render(item);

        const editForm = new ProductFormComponent(this.pageRoot);
        editForm.render(this.updateProduct.bind(this), item);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete Product';
        deleteButton.addEventListener('click', () => {
            this.deleteProduct();
        });
        this.pageRoot.appendChild(deleteButton);
    }

    clickBack() {
        window.location.hash = '#';
    }

    updateProduct(updatedProduct) {
        if (!this.id) {
            console.error('Product ID is undefined');
            return;
        }
        ajax.patch(productUrls.updateProductById(this.id), updatedProduct, (data, status) => {
            if (status === 200) {
                this.getData();
            } else {
                console.error('Failed to update product:', status, data);
            }
        });
    }

    deleteProduct() {
        if (!this.id) {
            console.error('Product ID is undefined');
            return;
        }
        ajax.delete(productUrls.removeProductById(this.id), (data, status) => {
            if (status === 200) {
                window.location.hash = '#';
            } else {
                console.error('Failed to delete product:', status, data);
            }
        });
    }

    render() {
        this.parent.innerHTML = '';
        const html = `<h1>Product Details</h1>`;
        this.parent.insertAdjacentHTML('beforeend', html);
        this.pageRoot = this.parent;
        this.getData();

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));
    }
}