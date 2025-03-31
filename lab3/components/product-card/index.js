export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(product, onClick) {
        const cardHTML = `
            <div class="card product-card mb-4" style="width: 18rem;">
                <img src="${product.src}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="product-card-price" data-original-price="${product.price}">Цена: $${product.price.toFixed(2)}</p>
                    <button class="btn btn-primary">Подробнее</button>
                </div>
            </div>
        `;

        this.parent.insertAdjacentHTML('beforeend', cardHTML);

        const card = this.parent.lastElementChild;
        const button = card.querySelector('.btn-primary');
        button.addEventListener('click', () => {
            onClick(product.id);
        });
    }
}