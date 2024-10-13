import { Product } from "src/products/entities/product.entity";

export class CreatePhotoDto {

	path: string;

	order: number;

	product: Product;

}
