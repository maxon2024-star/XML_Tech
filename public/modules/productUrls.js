// modules/productUrls.js
class ProductUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getProducts() {
        return `${this.baseUrl}/products`;
    }

    getProductById(id) {
        return `${this.baseUrl}/products/${id}`;
    }

    createProduct() {
        return `${this.baseUrl}/products`;
    }

    removeProductById(id) {
        return `${this.baseUrl}/products/${id}`;
    }

    updateProductById(id) {
        return `${this.baseUrl}/products/${id}`;
    }
}

export const productUrls = new ProductUrls();