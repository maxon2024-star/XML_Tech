class StockUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }
    getStocks() {
        return `${this.baseUrl}/products`;
    }
    getStockById(id) {
        return `${this.baseUrl}/products/${id}`;
    }
    createStock() {
        return `${this.baseUrl}/products`;
    }
    updateStockById(id) {
        return `${this.baseUrl}/products/${id}`;
    }
    deleteStockById(id) {
        return `${this.baseUrl}/products/${id}`;
    }
}
export const stockUrls = new StockUrls();