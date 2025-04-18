export class ProductFormComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(onSubmit, product = {}, onDelete = null) {
        const isEdit = !!product.id;
        this.parent.innerHTML = `
            <form id="productForm" class="product-form">
                <input type="text" name="title" placeholder="Название" value="${product.title || ''}" required />
                <input type="text" name="src" placeholder="Ссылка на изображение" value="${product.src || ''}" required />
                <textarea name="description" placeholder="Описание" required>${product.description || ''}</textarea>
                <input type="number" name="price" placeholder="Цена" value="${product.price || ''}" required />
                <div class="form-buttons">
                    <button type="submit">Сохранить</button>
                    ${isEdit ? '<button type="button" id="deleteButton" class="delete-button">Удалить</button>' : ''}
                </div>
            </form>
        `;

        const form = this.parent.querySelector('#productForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const productData = {
                title: formData.get('title'),
                src: formData.get('src'),
                description: formData.get('description'),
                price: parseFloat(formData.get('price')),
            };
            onSubmit(productData);
        });

        if (isEdit && onDelete) {
            const deleteButton = this.parent.querySelector('#deleteButton');
            deleteButton.addEventListener('click', () => {
                if (confirm('Вы уверены, что хотите удалить продукт?')) {
                    onDelete(product.id);
                }
            });
        }
    }
}
