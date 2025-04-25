// src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductsService {
  private readonly filePath = path.resolve(__dirname, '../assets/products.json');

  async read(): Promise<Product[]> {
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

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const products = await this.read();
    const product: Product = {
      ...createProductDto,
      id: products.length + 1, // Генерируем уникальный ID
    };
    products.push(product);
    fs.writeFileSync(this.filePath, JSON.stringify(products, null, 2), 'utf8');
    return product;
  }

  async findAll(title?: string, priceGte?: number, priceLte?: number): Promise<Product[]> {
    const products = await this.read();
    let filteredProducts = products;

    if (title) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(title.toLowerCase()),
      );
    }

    if (priceGte !== undefined) {
      filteredProducts = filteredProducts.filter((product) => product.price >= priceGte);
    }

    if (priceLte !== undefined) {
      filteredProducts = filteredProducts.filter((product) => product.price <= priceLte);
    }

    return filteredProducts;
  }

  async findOne(id: number): Promise<Product | null> {
    const products = await this.read();
    return products.find((product) => product.id === id) ?? null;
  }

  async update(id: number, updatedProduct: Partial<Product>): Promise<Product | null> {
    const products = await this.read();
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
      return null;
    }

    products[productIndex] = { ...products[productIndex], ...updatedProduct };
    fs.writeFileSync(this.filePath, JSON.stringify(products, null, 2), 'utf8');
    return products[productIndex];
  }

  async remove(id: number): Promise<boolean> {
    const products = await this.read();
    const filteredProducts = products.filter((product) => product.id !== id);
    fs.writeFileSync(this.filePath, JSON.stringify(filteredProducts, null, 2), 'utf8');
    return true;
  }
}