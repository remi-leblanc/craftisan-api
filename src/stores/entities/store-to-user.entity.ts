import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne } from "typeorm";
import { Store } from "./store.entity";

export enum UserRole {
	OWNER = "owner",
	EDITOR = "editor",
	GHOST = "ghost",
}

@Entity()
export class StoreToUser {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: "enum",
		enum: UserRole,
		default: UserRole.GHOST,
	})
	role: UserRole;

	@ManyToOne(() => Store, (store) => store.storeToUsers)
	store: Store;

	@ManyToOne(() => User, (user) => user.storeToUsers)
	user: User;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

}
