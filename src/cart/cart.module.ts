import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-item.entity';

@Module({
	imports: [TypeOrmModule.forFeature([CartItem])],
	controllers: [CartController],
	providers: [CartService],
	exports: [CartService]
})
export class CartModule { }
