class ProductUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000/products';
    }

    getProducts() {
        return `${this.baseUrl}`;
    }

    getProductById(id) {
        return `${this.baseUrl}/${id}`;
    }

    createProduct() {
        return `${this.baseUrl}`;
    }

    removeProductById(id) {
        return `${this.baseUrl}/${id}`;
    }

    updateProductById(id) {
        return `${this.baseUrl}/${id}`;
    }
}

export const productUrls = new ProductUrls();