// components/product-card/index.js
export class ProductCardComponent {
    constructor(parent, isAnagram) {
        this.parent = parent;
        this.isAnagram = isAnagram;
    }

    render(data, onClick) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${data.src}" alt="${data.title}">
            <div class="card-content">
                <h3>${data.title}</h3>
                <p>${data.description}</p>
                <p>Цена: ${data.price}$</p>
                <label>
                    <input type="checkbox" class="anagram-checkbox" ${this.isAnagram(data.title) ? 'checked' : ''}> Анаграмма
                </label>
                <button class="btn-primary">Подробнее</button>
            </div>
        `;
        card.querySelector('.btn-primary').addEventListener('click', () => onClick(data.id));
        this.parent.appendChild(card);
    }
}