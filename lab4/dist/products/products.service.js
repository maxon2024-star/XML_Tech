"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
// src/products/products.service.ts
const common_1 = require("@nestjs/common");
const file_service_1 = require("../file.service");
let ProductsService = class ProductsService {
    constructor(fileService) {
        this.fileService = fileService;
    }
    create(createProductDto) {
        const products = this.fileService.read();
        const product = Object.assign(Object.assign({}, createProductDto), { id: products.length + 1 });
        this.fileService.add(product);
        return product;
    }
    findAll(title, priceGte, priceLte) {
        const products = this.fileService.read();
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
    findOne(id) {
        var _a;
        const products = this.fileService.read();
        return (_a = products.find((product) => product.id === id)) !== null && _a !== void 0 ? _a : null;
    }
    update(id, updateProductDto) {
        const products = this.fileService.read();
        const updatedProducts = products.map((product) => product.id === id ? Object.assign(Object.assign({}, product), updateProductDto) : product);
        this.fileService.write(updatedProducts);
    }
    remove(id) {
        const filteredProducts = this.fileService
            .read()
            .filter((product) => product.id !== id);
        this.fileService.write(filteredProducts);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [file_service_1.FileService])
], ProductsService);
