export class ProductFormComponent {
    constructor(root, onSubmit) {
        this.root = root;
        this.onSubmit = onSubmit;
    }

    render(product = {}) {
        const form = document.createElement('form');
        form.className = 'product-form';
        form.innerHTML = `
            <input type="text" name="title" placeholder="Title" value="${product.title || ''}">
            <textarea name="description" placeholder="Description">${product.description || ''}</textarea>
            <input type="number" name="price" placeholder="Price" value="${product.price || ''}">
            <input type="text" name="src" placeholder="Image URL" value="${product.src || ''}">
            <button type="submit">${product.id ? 'Update' : 'Create'} Product</button>
        `;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            this.onSubmit(data);
        });
        this.root.innerHTML = '';
        this.root.appendChild(form);
    }
}