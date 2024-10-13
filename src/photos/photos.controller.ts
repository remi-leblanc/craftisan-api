import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, StreamableFile } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { Product } from 'src/products/entities/product.entity';
import { join } from 'path';
import { Public } from 'src/auth/public.decorator';

@Controller('photos')
export class PhotosController {
	constructor(private readonly photosService: PhotosService) { }

	@Post()
	@UseInterceptors(FileInterceptor('file'))
	create(@UploadedFile() file: Express.Multer.File, @Body() body: { product: Product, order: number } ) {
		const path = 'uploads/' + file.originalname;
		fs.writeFileSync(path, file.buffer)
		return this.photosService.create({ path: path, order: body.order, product: body.product });
	}

	@Get()
	findAll() {
		return this.photosService.findAll();
	}

	@Get(':id')
	@Public()
	async findOne(@Param('id') id: string): Promise<StreamableFile> {
		const file = await this.photosService.findOne(+id);
		const fileStream = fs.createReadStream(join(process.cwd(), file.path));
		return new StreamableFile(fileStream, {
			type: 'image/png'
		});
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updatePhotoDto: UpdatePhotoDto) {
		return this.photosService.update(+id, updatePhotoDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.photosService.remove(+id);
	}
}
