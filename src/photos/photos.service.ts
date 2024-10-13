import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PhotosService {

	constructor(
		@InjectRepository(Photo)
		private photoRepository: Repository<Photo>,
	) { }

	create(createPhotoDto: CreatePhotoDto) {
		const newPhoto = this.photoRepository.create(createPhotoDto);
		return this.photoRepository.save(newPhoto);
	}

	findAll() {
		return `This action returns all photos`;
	}

	async findOne(id: number) {
		return this.photoRepository.findOneBy({
			id
		});
	}

	update(id: number, updatePhotoDto: UpdatePhotoDto) {
		return `This action updates a #${id} photo`;
	}

	remove(id: number) {
		return `This action removes a #${id} photo`;
	}
}
