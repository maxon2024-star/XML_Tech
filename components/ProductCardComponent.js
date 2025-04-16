export class ProductCardComponent {
    constructor(root) {
        this.root = root;
    }

    render(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.src}" alt="${product.title}">
            <div>
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
                <button data-id="${product.id}" class="view-details">View Details</button>
            </div>
        `;
        card.querySelector('.view-details').addEventListener('click', () => {
            window.location.hash = `#product/${product.id}`;
        });
        this.root.appendChild(card);
    }
}