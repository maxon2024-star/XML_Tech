// main.js
import './styles.css'; // Правильный путь к CSS-файлу
import { HomePage } from './pages/HomePage.js';
import { CreateEditProductPage } from './pages/CreateEditProductPage.js';
import { ProductDetailsPage } from './pages/ProductDetailsPage.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    function renderPage() {
        const hash = window.location.hash;

        if (hash === '') {
            const homePage = new HomePage(app);
            homePage.render();
        } else if (hash.startsWith('#edit/')) {
            const productId = hash.split('#edit/')[1];
            console.log('Edit Product ID:', productId); // Добавлено для отладки
            if (productId) {
                const editProductPage = new CreateEditProductPage(app, productId);
                editProductPage.render();
            } else {
                console.error('Product ID is undefined');
                app.innerHTML = '<h1>Product not found</h1>';
            }
        } else if (hash.startsWith('#details/')) {
            const productId = hash.split('#details/')[1];
            console.log('Details Product ID:', productId); // Добавлено для отладки
            if (productId) {
                const productDetailsPage = new ProductDetailsPage(app, productId);
                productDetailsPage.render();
            } else {
                console.error('Product ID is undefined');
                app.innerHTML = '<h1>Product not found</h1>';
            }
        } else if (hash === '#create') {
            const createProductPage = new CreateEditProductPage(app);
            createProductPage.render();
        } else {
            app.innerHTML = '<h1>404 Not Found</h1>';
        }
    }

    window.addEventListener('hashchange', renderPage);
    renderPage();
});