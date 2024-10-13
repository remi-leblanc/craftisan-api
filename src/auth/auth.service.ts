import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) { }

	async signIn(email: string, pass: string): Promise<{ access_token: string }> {

		const user = await this.usersService.findByEmail(email);

		const isMatch = await bcrypt.compare(pass, user?.password);

		if (!isMatch) {
			throw new UnauthorizedException();
		}

		const payload = { sub: user.id, email: user.email };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}

	async signUp(createUserDto: CreateUserDto): Promise<{ access_token: string }> {

		const existingUser = await this.usersService.findByEmail(createUserDto.email);

		if (existingUser) {
			throw new UnauthorizedException();
		}

		const hashPass = await bcrypt.hash(createUserDto.password, 10);

		let data = {
			...createUserDto,
			password: hashPass
		}

		const newUser = await this.usersService.create(data);

		const payload = { sub: newUser.id, email: newUser.email };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}

}
