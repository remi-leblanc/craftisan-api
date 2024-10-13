import { Store } from "src/stores/entities/store.entity";

export class CreateProductDto {
	name: string;

	description: string;

	store: Store;
}
