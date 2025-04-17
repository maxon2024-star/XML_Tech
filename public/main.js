import { HomePage } from './pages/HomePage.js';
import { ProductPage } from './pages/ProductPage.js';
import { CreateEditProductPage } from './pages/CreateEditProductPage.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    function renderPage() {
        const hash = window.location.hash;

        if (hash === '') {
            const homePage = new HomePage(app);
            homePage.render();
        } else if (hash.startsWith('#product/')) {
            const productId = hash.split('/')[2];
            const productPage = new ProductPage(app, productId);
            productPage.render();
        } else if (hash === '#create') {
            const createProductPage = new CreateEditProductPage(app);
            createProductPage.render();
        } else if (hash.startsWith('#edit/')) {
            const productId = hash.split('/')[2];
            const editProductPage = new CreateEditProductPage(app, productId);
            editProductPage.render();
        } else {
            app.innerHTML = '<h1>404 Not Found</h1>';
        }
    }

    window.addEventListener('hashchange', renderPage);
    renderPage();
});