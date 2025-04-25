"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
// src/products/products.service.ts
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
let ProductsService = class ProductsService {
    constructor() {
        this.filePath = path.resolve(__dirname, '../assets/products.json');
    }
    async read() {
        const data = fs.readFileSync(this.filePath, 'utf8');
        if (!data.trim()) {
            return [];
        }
        const parsedData = JSON.parse(data);
        if (!Array.isArray(parsedData)) {
            throw new Error('File does not contain a valid array');
        }
        return parsedData;
    }
    async create(createProductDto) {
        const products = await this.read();
        const product = Object.assign(Object.assign({}, createProductDto), { id: products.length + 1 });
        products.push(product);
        fs.writeFileSync(this.filePath, JSON.stringify(products, null, 2), 'utf8');
        return product;
    }
    async findAll(title, priceGte, priceLte) {
        const products = await this.read();
        let filteredProducts = products;
        if (title) {
            filteredProducts = filteredProducts.filter((product) => product.title.toLowerCase().includes(title.toLowerCase()));
        }
        if (priceGte !== undefined) {
            filteredProducts = filteredProducts.filter((product) => product.price >= priceGte);
        }
        if (priceLte !== undefined) {
            filteredProducts = filteredProducts.filter((product) => product.price <= priceLte);
        }
        return filteredProducts;
    }
    async findOne(id) {
        var _a;
        const products = await this.read();
        return (_a = products.find((product) => product.id === id)) !== null && _a !== void 0 ? _a : null;
    }
    async update(id, updatedProduct) {
        const products = await this.read();
        const productIndex = products.findIndex((product) => product.id === id);
        if (productIndex === -1) {
            return null;
        }
        products[productIndex] = Object.assign(Object.assign({}, products[productIndex]), updatedProduct);
        fs.writeFileSync(this.filePath, JSON.stringify(products, null, 2), 'utf8');
        return products[productIndex];
    }
    async remove(id) {
        const products = await this.read();
        const filteredProducts = products.filter((product) => product.id !== id);
        fs.writeFileSync(this.filePath, JSON.stringify(filteredProducts, null, 2), 'utf8');
        return true;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)()
], ProductsService);
