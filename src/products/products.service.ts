import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

	constructor(
		@InjectRepository(Product)
		private productRepository: Repository<Product>,
	) { }

	create(createProductDto: CreateProductDto) {
		const newProduct = this.productRepository.create(createProductDto);
		return this.productRepository.save(newProduct);
	}

	findAll() {
		return this.productRepository.find({
			relations: {
				photos: true
			},
		});
	}

	findOne(id: number) {
		return this.productRepository.findOne({
			where: {
				id
			},
			relations: {
				photos: true
			},
		});
	}

	update(id: number, updateProductDto: UpdateProductDto) {
		return `This action updates a #${id} product`;
	}

	remove(id: number) {
		return `This action removes a #${id} product`;
	}
}
