import { ProductFormComponent } from '../components/ProductFormComponent.js';
import { BackButtonComponent } from '../components/BackButtonComponent.js';
import { ajax } from '../modules/ajax.js';
import { stockUrls } from '../modules/stockUrls.js';

export class CreateProductPage {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        this.parent.innerHTML = '';

        const formComponent = new ProductFormComponent(this.parent, (data) => {
            ajax.post(stockUrls.createStock(), data, (response, status) => {
                if (status === 201) {
                    alert('Product created successfully!');
                    window.location.hash = '#';
                } else {
                    alert('Failed to create product.');
                }
            });
        });

        const backButton = new BackButtonComponent(this.parent);
        backButton.render(() => {
            window.location.hash = '#';
        });
    }
}