// src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { FileService } from '../file.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private fileService: FileService<Product[]>) {}

  create(createProductDto: CreateProductDto) {
    const products = this.fileService.read();
    const product: Product = {
      ...createProductDto,
      id: products.length + 1,
    };
    this.fileService.add(product);
    return product;
  }

  findAll(title?: string, priceGte?: number, priceLte?: number): Product[] {
    const products = this.fileService.read();
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

  findOne(id: number): Product | null {
    const products = this.fileService.read();
    return products.find((product) => product.id === id) ?? null;
  }

  update(id: number, updateProductDto: UpdateProductDto): void {
    const products = this.fileService.read();
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, ...updateProductDto } : product,
    );
    this.fileService.write(updatedProducts);
  }

  remove(id: number): void {
    const filteredProducts = this.fileService
      .read()
      .filter((product) => product.id !== id);
    this.fileService.write(filteredProducts);
  }
}