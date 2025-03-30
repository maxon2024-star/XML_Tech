export class PhotoCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(photo, onClick) {
        const cardHTML = `
            <div class="card photo-card mb-4" style="width: 18rem;">
                <img src="${photo.src}" class="card-img-top" alt="${photo.title}">
                <div class="card-body">
                    <h5 class="card-title">${photo.title}</h5>
                    <p class="card-text">${photo.description}</p>
                    <p class="photo-card-price" data-original-price="${photo.price}">Цена: $${photo.price.toFixed(2)}</p>
                    <button class="btn btn-primary">Подробнее</button>
                </div>
            </div>
        `;

        this.parent.insertAdjacentHTML('beforeend', cardHTML);

        const card = this.parent.lastElementChild;
        const button = card.querySelector('.btn-primary');
        button.addEventListener('click', () => {
            onClick(photo.id);
        });
    }
}