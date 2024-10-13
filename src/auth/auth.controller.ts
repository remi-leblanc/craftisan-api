import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BaseUser } from 'src/users/dto/base-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from './auth.guard';
import { Public } from './public.decorator';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { CartItem } from 'src/cart/entities/cart-item.entity';
import { CartService } from 'src/cart/cart.service';

@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private usersService: UsersService,
		private cartItemsService: CartService
	) { }

	@HttpCode(HttpStatus.OK)
	@Public()
	@Post('login')
	async signIn(@Body() signInDto: BaseUser, @Res({ passthrough: true }) response: Response) {

		const token = await this.authService.signIn(signInDto.username, signInDto.password);

		response.cookie('jwt', token.access_token, { httpOnly: true, secure: true });
	}

	@HttpCode(HttpStatus.OK)
	@Public()
	@Post('signup')
	signUp(@Body() signUpDto: CreateUserDto) {
		return this.authService.signUp(signUpDto);
	}

	@Public()
	@Get('me')
	async getProfile(@Request() req) {
		let response: {
			username?: string,
			cart: {
				items: CartItem[]
			}
		} = {
			cart: { items: [] }
		};
		if (req.user) {
			const user = await this.usersService.findById(req.user.id)
			response.username = user.username;
		}
		response.cart.items = await this.cartItemsService.findItemsForUserOrAnon({
			userId: req.user ? req.user.id : null,
			anonId: req.cookies['anonId'] ? req.cookies['anonId'] : null
		})
		return response;
	}

}
