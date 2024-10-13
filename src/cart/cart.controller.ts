import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Res } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { Public } from 'src/auth/public.decorator';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Controller('cart')
export class CartController {
	constructor(private readonly cartItemsService: CartService) { }

	@Public()
	@Post()
	createItem(@Request() req, @Res({ passthrough: true }) response: Response, @Body() createCartItemDto: CreateCartItemDto) {
		if (req.user) {
			return this.cartItemsService.createItem({
				createCartItemDto: createCartItemDto,
				user: req.user,
				anonId: null
			});
		} else {
			let anonId: string;
			if (req.cookies['anonId']) {
				anonId = req.cookies['anonId'];
				response.cookie('anonId', req.cookies['anonId'], { httpOnly: true, secure: true, maxAge: 3600 * 1000 * 24 * 1 });
			}
			else {
				anonId = uuidv4();
				response.cookie('anonId', anonId, { httpOnly: true, secure: true, maxAge: 3600 * 1000 * 24 * 1 });
			}
			return this.cartItemsService.createItem({
				createCartItemDto: createCartItemDto,
				user: null,
				anonId: anonId
			});
		}
	}

	@Get()
	findItems() {
		return this.cartItemsService.findItems();
	}

	@Public()
	@Get('foruser')
	findItemsForUserOrAnon(@Request() req) {
		return this.cartItemsService.findItemsForUserOrAnon({
			userId: req.user ? req.user.id : null,
			anonId: req.cookies['anonId'] ? req.cookies['anonId'] : null
		})
	}

	@Get('item/:id')
	findItem(@Param('id') id: string) {
		return this.cartItemsService.findItem(+id);
	}

	@Public()
	@Patch(':id')
	updateItem(@Param('id') id: number, @Request() req, @Res({ passthrough: true }) response: Response, @Body() updateCartItemDto: UpdateCartItemDto) {
		if (req.user) {
			return this.cartItemsService.updateItem({
				updateCartItemDto: updateCartItemDto,
				id: id,
				user: req.user,
				anonId: null
			});
		} else {
			let anonId: string;
			if (req.cookies['anonId']) {
				anonId = req.cookies['anonId'];
				response.cookie('anonId', req.cookies['anonId'], { httpOnly: true, secure: true, maxAge: 3600 * 1000 * 24 * 1 });
			}
			else {
				anonId = uuidv4();
				response.cookie('anonId', anonId, { httpOnly: true, secure: true, maxAge: 3600 * 1000 * 24 * 1 });
			}
			return this.cartItemsService.updateItem({
				updateCartItemDto: updateCartItemDto,
				id: id,
				user: null,
				anonId: anonId
			});
		}
	}

	@Delete(':id')
	removeItem(@Param('id') id: string) {
		return this.cartItemsService.removeItem(+id);
	}

	@Public()
	@Get('pricing')
	pricing(@Request() req) {
		return this.cartItemsService.getPricing({
			userId: req.user ? req.user.id : null,
			anonId: req.cookies['anonId'] ? req.cookies['anonId'] : null
		});
	}
}
