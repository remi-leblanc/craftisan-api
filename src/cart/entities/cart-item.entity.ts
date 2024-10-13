import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, OneToOne } from "typeorm";

@Entity()
export class CartItem {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Product, product => product.cartItems)
	product: Product;

	@Column()
	quantity: number;

	@ManyToOne(() => User, user => user.cartItems)
	user?: User;

	@Column({ nullable: true })
	anonId?: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
