import { CartItem } from "src/cart/entities/cart-item.entity";
import { StoreToUser } from "src/stores/entities/store-to-user.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;
	
	@OneToMany(() => StoreToUser, storeToUser => storeToUser.user)
	storeToUsers?: StoreToUser[];

	@OneToMany(() => CartItem, cartItem => cartItem.user)
	cartItems?: CartItem[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}