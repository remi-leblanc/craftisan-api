import { StoreToUser } from "src/stores/entities/store-to-user.entity";

export class BaseUser {
	id?: number;

	username?: string;

	email: string;

	password: string;

	storeToUsers?: StoreToUser[];

}