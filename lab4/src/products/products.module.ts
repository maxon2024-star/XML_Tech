// src/products/products.module.ts
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { FileService } from '../file.service';
import { Product } from './entities/product.entity';

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
export class ProductsModule {}