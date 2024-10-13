import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { StoresModule } from './stores/stores.module';
import { ProductsModule } from './products/products.module';
import { PhotosModule } from './photos/photos.module';
import { CartModule } from './Cart/cart.module';


@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		UsersModule,
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.PG_HOST,
			port: parseInt(process.env.PG_PORT),
			username: process.env.PG_USER,
			password: process.env.PG_PASSWORD,
			database: process.env.PG_DB,
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: true,
		}),
		AuthModule,
		StoresModule,
		ProductsModule,
		PhotosModule,
		CartModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }