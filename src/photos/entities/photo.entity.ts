
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Photo {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	path: string;

	@Column()
	order: number;

	@ManyToOne(() => Product, (product) => product.photos)
	product: Product;

}
