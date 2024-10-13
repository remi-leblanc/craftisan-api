import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToMany } from "typeorm";
import { StoreToUser } from "./store-to-user.entity";
import { Product } from "src/products/entities/product.entity";

@Entity()
export class Store {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	name: string;

	@OneToMany(() => StoreToUser, storeToUser => storeToUser.store)
	storeToUsers: StoreToUser[];

	@OneToMany(() => Product, (product) => product.store)
    products: Product[]
	
	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

}
