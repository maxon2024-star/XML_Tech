// components/ProductFormComponent.js
export class ProductFormComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(submitCallback, product = null) {
        const html = `
            <form id="productForm">
                <input type="text" id="title" placeholder="Title" value="${product ? product.title : ''}" required>
                <input type="text" id="src" placeholder="Image URL" value="${product ? product.src : ''}" required>
                <textarea id="description" placeholder="Description" required>${product ? product.description : ''}</textarea>
                <input type="number" id="price" placeholder="Price" value="${product ? product.price : ''}" required>
                <button type="submit">${product ? 'Update' : 'Add'} Product</button>
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