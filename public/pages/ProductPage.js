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
        ajax.get(productUrls.getProductById(this.id), (data) => {
            this.renderData(data);
        });
    }

    renderData(item) {
        const productCard = new ProductCardComponent(this.pageRoot);
        productCard.render(item);

        const editForm = new ProductFormComponent(this.pageRoot);
        editForm.render(this.updateProduct.bind(this), item);
    }

    clickBack() {
        window.location.hash = '#';
    }

    updateProduct(updatedProduct) {
        ajax.patch(productUrls.updateProductById(this.id), updatedProduct, (data, status) => {
            if (status === 200) {
                this.getData();
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