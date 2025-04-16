import { FileService } from '../file.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
export declare class ProductsService {
    private fileService;
    constructor(fileService: FileService<Product[]>);
    create(createProductDto: CreateProductDto): {
        id: number;
        src: string;
        title: string;
        description: string;
        price: number;
    };
    findAll(title?: string): Product[];
    findOne(id: number): Product | null;
    update(id: number, updateProductDto: UpdateProductDto): void;
    remove(id: number): void;
}
