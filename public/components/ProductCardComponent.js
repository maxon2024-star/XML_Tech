export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(product, clickCallback) {
        // Проверяем, есть ли src. Если нет, используем дефолтное изображение
        const src = product.src || 'https://via.placeholder.com/200x150?text=No+Image'; // Дефолтное изображение

        const html = `
            <div class="product-card" data-id="${product.id}">
                <img src="${src}" alt="${product.title}" style="width: 100%; height: auto;">
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