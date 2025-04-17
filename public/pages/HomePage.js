import { ProductCardComponent } from '../components/ProductCardComponent.js';
import { ProductFormComponent } from '../components/ProductFormComponent.js';
import { ajax } from '../modules/ajax.js';
import { productUrls } from '../modules/productUrls.js';

export class HomePage {
    constructor(parent) {
        this.parent = parent;
        this.pageRoot = document.createElement('div');
    }

    getData() {
        ajax.get(productUrls.getProducts(), (data) => {
            this.renderData(data);
        });
    }

    renderData(items) {
        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }

    clickCard(id) {
        window.location.hash = `#product/${id}`;
    }

    renderForm() {
        // Здесь мы не будем рисовать форму непосредственно на главной странице,
        // а вместо этого будем переходить на отдельную страницу создания продукта.
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
            <h1>Products</h1>
            <button id="addProductBtn">Add Product</button>
            <div id="productList"></div>
        `;
        this.parent.insertAdjacentHTML('beforeend', html);
        this.pageRoot = document.getElementById('productList');
        this.getData();

        const addButton = document.getElementById('addProductBtn');
        addButton.addEventListener('click', () => {
            // При нажатии на кнопку "Add Product", переходим на страницу создания продукта
            window.location.hash = '#create';
        });
    }
}