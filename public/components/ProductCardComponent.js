// components/ProductCardComponent.js
export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(product, clickCallback, editCallback, detailsCallback) {
        // Проверяем, есть ли src. Если нет, используем дефолтное изображение
        const src = product.src || 'https://via.placeholder.com/200x150?text=No+Image'; // Дефолтное изображение

        const html = `
            <div class="product-card" data-id="${product.id}">
                <img src="${src}" alt="${product.title}" style="width: 100%; height: auto;">
                <h2>${product.title}</h2>
                <p>Price: $${product.price}</p>
                <button class="edit-btn">Редактировать</button>
                <button class="details-btn">Подробнее</button>
            </div>
        `;
        this.parent.insertAdjacentHTML('beforeend', html);

        if (clickCallback) {
            const card = this.parent.querySelector(`.product-card[data-id="${product.id}"]`);
            if (card) {
                card.addEventListener('click', () => {
                    clickCallback(product.id);
                });
            } else {
                console.error('Product card element not found');
            }
        }

        const editButton = this.parent.querySelector(`.product-card[data-id="${product.id}"] .edit-btn`);
        if (editButton) {
            editButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Предотвращаем всплытие события клика
                if (editCallback) {
                    editCallback(product.id);
                }
            });
        }

        const detailsButton = this.parent.querySelector(`.product-card[data-id="${product.id}"] .details-btn`);
        if (detailsButton) {
            detailsButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Предотвращаем всплытие события клика
                if (detailsCallback) {
                    detailsCallback(product.id);
                }
            });
        }
    }
}