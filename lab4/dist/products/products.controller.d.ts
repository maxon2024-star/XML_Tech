import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): {
        id: number;
        src: string;
        title: string;
        description: string;
        price: number;
    };
    findAll(title?: string): Product[];
    findOne(id: string): Product | null;
    update(id: string, updateProductDto: UpdateProductDto): {
        message: string;
    };
    remove(id: string): {
        message: string;
    };
}
