document.addEventListener('DOMContentLoaded', () => {
    const api = window.API;
    const productId = new URLSearchParams(window.location.search).get('id');
    const productDetailsDiv = document.getElementById('productDetails');

    if (productId) {
        api.get(`${API_BASE_URL}/${productId}`, (err, product) => {
            if (err) {
                console.error('Ошибка загрузки продукта:', err);
                productDetailsDiv.innerHTML = '<p>Ошибка загрузки продукта. Попробуйте позже.</p>';
                return;
            }
            const details = `
                <img src="${product.src}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <p>Цена: $${product.price}</p>
            `;
            productDetailsDiv.innerHTML = details;
        });
    }

    // Кнопка "Назад"
    document.getElementById('backBtn').addEventListener('click', () => {
        window.history.back();
    });
});