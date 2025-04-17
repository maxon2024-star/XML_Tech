export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(product, clickCallback) {
        const html = `
            <div class="product-card" data-id="${product.id}">
                <img src="${product.src}" alt="${product.title}" style="width: 100%; height: auto;">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
            </div>
        `;
        this.parent.insertAdjacentHTML('beforeend', html);

        if (clickCallback) {
            const card = this.parent.querySelector(`.product-card[data-id="${product.id}"]`);
            card.addEventListener('click', () => {
                clickCallback(product.id);
            });
        }
    }
}