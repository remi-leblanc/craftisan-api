import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { User } from 'src/users/entities/user.entity';
import { Store } from './entities/store.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreToUser, UserRole } from './entities/store-to-user.entity';

@Injectable()
export class StoresService {

	constructor(
		@InjectRepository(Store)
		private storeRepository: Repository<Store>,
		@InjectRepository(StoreToUser)
		private storeToUserRepository: Repository<StoreToUser>,
	) { }

	create(user: User, createStoreDto: CreateStoreDto) {
		const newStore = this.storeRepository.create(createStoreDto);
		const newStoreToUser = this.storeToUserRepository.create({store: newStore, user: user, role: UserRole.OWNER});
		
		this.storeRepository.save(newStore);
		this.storeToUserRepository.save(newStoreToUser);

		return newStore;
	}

	findAll() {
		return `This action returns all stores`;
	}

	findOne(id: number) {
		return `This action returns a #${id} store`;
	}

	update(id: number, updateStoreDto: UpdateStoreDto) {
		return `This action updates a #${id} store`;
	}

	remove(id: number) {
		return `This action removes a #${id} store`;
	}
}
