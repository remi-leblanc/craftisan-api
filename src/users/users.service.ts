import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) { }

	async findAll(): Promise<User[]> {
		return this.userRepository.find();
	}

	async findById(id: number): Promise<User> {
		return this.userRepository.findOne({ where: { id } });
	}

	async findByEmail(email: string): Promise<User> {
		return this.userRepository.findOne({ where: { email } });
	}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const newuser = this.userRepository.create(createUserDto);
		return this.userRepository.save(newuser);
	}

	async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
		await this.userRepository.update(id, updateUserDto);
		return this.userRepository.findOne({ where: { id } });
	}

	async delete(id: number): Promise<void> {
		await this.userRepository.delete(id);
	}
}