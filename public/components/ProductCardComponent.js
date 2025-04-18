export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(product, onEdit, onViewDetails) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.src}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3>${product.title}</h3>
                <strong>${product.price} ₽</strong>
                <div class="product-actions">
                    <button class="btn-detail">Подробнее</button>
                    <button class="btn-edit">Редактировать</button>
                </div>
            </div>
        `;

        card.querySelector('.btn-detail').addEventListener('click', () => {
            onViewDetails(product.id);
        });

        card.querySelector('.btn-edit').addEventListener('click', () => {
            onEdit(product.id);
        });

        this.parent.appendChild(card);
    }
}
