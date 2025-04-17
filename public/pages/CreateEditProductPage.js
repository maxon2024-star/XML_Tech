import { ProductFormComponent } from '../components/ProductFormComponent.js';
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

    updateProduct(product) {
        ajax.patch(productUrls.updateProductById(this.productId), product, (data, status) => {
            if (status === 200) {
                window.location.hash = `#product/${data.id}`;
            }
        });
    }

    render() {
        this.parent.innerHTML = '';
        const html = `
            <h1>${this.productId ? 'Edit Product' : 'Create New Product'}</h1>
        `;
        this.parent.insertAdjacentHTML('beforeend', html);
        this.pageRoot = this.parent;

        const form = new ProductFormComponent(this.pageRoot);
        if (this.productId) {
            ajax.get(productUrls.getProductById(this.productId), (data) => {
                form.render(this.updateProduct.bind(this), data);
            });
        } else {
            form.render(this.addProduct.bind(this));
        }
    }
}