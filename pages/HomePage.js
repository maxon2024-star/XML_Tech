import { ProductCardComponent } from '../components/ProductCardComponent.js';
import { BackButtonComponent } from '../components/BackButtonComponent.js';
import { ajax } from '../modules/ajax.js';
import { stockUrls } from '../modules/stockUrls.js';

export class HomePage {
    constructor(parent) {
        this.parent = parent;
    }

    getData() {
        ajax.get(stockUrls.getStocks(), (data) => {
            this.renderData(data);
        });
    }

    renderData(items) {
        const createButton = document.createElement('button');
        createButton.innerText = 'Create New Product';
        createButton.addEventListener('click', () => {
            window.location.hash = '#create';
        });
        this.parent.appendChild(createButton);

        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.parent);
            productCard.render(item);
        });
    }

    render() {
        this.parent.innerHTML = '';
        this.getData();
    }
}