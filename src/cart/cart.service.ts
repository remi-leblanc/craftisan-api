import { Injectable } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CartItem } from './entities/cart-item.entity';

@Injectable()
export class CartService {
	constructor(
		@InjectRepository(CartItem)
		private cartItemRepository: Repository<CartItem>,
	) { }

	createItem({ createCartItemDto, user, anonId }: { createCartItemDto: CreateCartItemDto, user?: User, anonId?: string }) {
		const cartItem = this.cartItemRepository.create({ ...createCartItemDto, user: user, anonId: anonId });

		this.cartItemRepository.save(cartItem);

		return cartItem;
	}

	findItems() {
		return `This action returns all cartItems`;
	}

	findItemsForUserOrAnon({ userId, anonId }: { userId?: User, anonId?: string }) {
		return this.cartItemRepository
			.createQueryBuilder("ci")
			.leftJoinAndSelect("ci.product", "product")
			.leftJoinAndSelect("product.photos", "photos")
			.where("ci.user = :userId", { userId: userId })
			.orWhere("ci.anonId = :anonId", { anonId: anonId })
			.orderBy("ci.id")
			.getMany();
	}

	findItem(id: number) {
		return `This action returns a #${id} cartItem`;
	}

	updateItem({ updateCartItemDto, id, user, anonId }: { updateCartItemDto: UpdateCartItemDto, id: number, user?: User, anonId?: string }) {
		return this.cartItemRepository.update(
			{
				id: id,
				user: user ? user : IsNull(),
				anonId: anonId ? anonId : IsNull()
			},
			{
				quantity: updateCartItemDto.quantity
			}
		)
	}

	removeItem(id: number) {
		return `This action removes a #${id} cartItem`;
	}

	getPricing({ userId, anonId }: { userId?: User, anonId?: string }) {
		const subtotal = this.cartItemRepository
			.createQueryBuilder("ci")
			.leftJoin("ci.product", "product")
			.select("SUM(product.price * ci.quantity)", "subtotal")
			.where("ci.user = :userId", { userId: userId })
			.orWhere("ci.anonId = :anonId", { anonId: anonId })
			.getRawOne();

			
	}

}
