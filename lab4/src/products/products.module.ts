// src/products/products.module.ts
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { FileService } from '../file.service';
import { FileAccessor } from '../file.service'; // Импортируем FileAccessor
import { Product } from './entities/product.entity'; // Импортируем Product

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: FileService,
      useFactory: () => new FileService<Product[]>('assets/products.json'),
    },
  ],
})
export class ProductsModule implements FileAccessor {
  public readonly filePath = 'assets/products.json';
}