import { CartItem } from "src/cart/entities/cart-item.entity";
import { Photo } from "src/photos/entities/photo.entity";
import { Store } from "src/stores/entities/store.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column('decimal', { precision: 8, scale: 2, default: 0 })
	price: number;

	@Column("text")
	description: string;

	@OneToMany(() => Photo, (photo) => photo.product)
	photos: Photo[];

	@ManyToOne(() => Store, (store) => store.products)
    store: Store

	@OneToMany(() => CartItem, (cartItem) => cartItem.product)
	cartItems: CartItem[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
