import { ProductCardComponent } from '../components/ProductCardComponent.js';
import { BackButtonComponent } from '../components/BackButtonComponent.js';
import { ajax } from '../modules/ajax.js';
import { stockUrls } from '../modules/stockUrls.js';

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        ajax.get(stockUrls.getStockById(this.id), (data) => {
            this.renderData(data);
        });
    }

    renderData(item) {
        const productCard = new ProductCardComponent(this.parent);
        productCard.render(item);

        const backButton = new BackButtonComponent(this.parent);
        backButton.render(() => {
            window.location.hash = '#';
        });
    }

    render() {
        this.parent.innerHTML = '';
        this.getData();
    }
}