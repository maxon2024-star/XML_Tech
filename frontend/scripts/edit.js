document.addEventListener('DOMContentLoaded', () => {
    const api = window.API;
    const productId = new URLSearchParams(window.location.search).get('id');

    // Получение элементов формы
    const form = document.getElementById('editForm');
    const srcInput = document.getElementById('src');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const priceInput = document.getElementById('price');
    const deleteBtn = document.getElementById('deleteBtn');
    const backBtn = document.getElementById('backBtn');

    // Загрузка текущего продукта
    if (productId) {
        api.get(`${API_BASE_URL}/${productId}`, (err, product) => {
            if (err) {
                console.error('Ошибка загрузки продукта:', err);
                alert(err.message);
                return;
            }
            srcInput.value = product.src;
            titleInput.value = product.title;
            descriptionInput.value = product.description;
            priceInput.value = product.price;
            document.getElementById('productId').value = product.id;
        });
    }

    // Обработчик формы
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = {
            src: srcInput.value,
            title: titleInput.value,
            description: descriptionInput.value,
            price: parseFloat(priceInput.value),
        };

        if (productId) {
            // Обновление существующего продукта
            const url = `${API_BASE_URL}/${productId}`;
            api.patch(url, data, (err) => {
                if (err) {
                    console.error('Ошибка обновления продукта:', err);
                    alert(err.message);
                } else {
                    window.location.href = 'index.html';
                }
            });
        } else {
            // Создание нового продукта
            api.post(API_BASE_URL, data, (err) => {
                if (err) {
                    console.error('Ошибка создания продукта:', err);
                    alert(err.message);
                } else {
                    window.location.href = 'index.html';
                }
            });
        }
    });

    // Обработчик кнопки удаления
    deleteBtn.addEventListener('click', () => {
        if (!productId) return;
        const url = `${API_BASE_URL}/${productId}`;
        api.del(url, (err) => {
            if (err) {
                console.error('Ошибка удаления продукта:', err);
                alert(err.message);
            } else {
                window.location.href = 'index.html';
            }
        });
    });

    // Обработчик кнопки назад
    backBtn.addEventListener('click', () => {
        window.history.back();
    });
});