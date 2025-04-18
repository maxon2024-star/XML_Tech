export class ProductFormComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(submitCallback, product = null) {
        // Заполняем форму данными продукта, если они есть
        const titleValue = product ? product.title : '';
        const srcValue = product ? product.src : '';
        const descriptionValue = product ? product.description : '';
        const priceValue = product ? product.price : '';

        const html = `
            <form id="productForm">
                <input type="text" id="title" placeholder="Title" value="${titleValue}" required>
                <input type="text" id="src" placeholder="Image URL" value="${srcValue}" required>
                <textarea id="description" placeholder="Description" required>${descriptionValue}</textarea>
                <input type="number" id="price" placeholder="Price" value="${priceValue}" required>
                <button type="submit">${product ? 'Обновить' : 'Добавить'} продукт</button>
            </form>
        `;
        this.parent.insertAdjacentHTML('beforeend', html);

        const form = this.parent.querySelector('#productForm');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const title = form.querySelector('#title').value;
            const src = form.querySelector('#src').value;
            const description = form.querySelector('#description').value;
            const price = parseFloat(form.querySelector('#price').value);

            const productData = { title, src, description, price };
            submitCallback(productData);
        });
    }
}