import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'argon2';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	getById(id: string) {
		return this.prisma.user.findUnique({
			where: {
				id,
			},
			include: {
				tasks: true,
			},
		});
	}

	getByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: {
				email,
			},
		});
	}

	async getProfile(id: string) {
		const profile = await this.getById(id);

		if (!profile) {
			throw new NotFoundException('User not found');
		}

		const { password, ...reset } = profile;

		return reset;
	}

	async create(dto: AuthDto) {
		const user = {
			email: dto.email,
			name: dto.name || '',
			password: await hash(dto.password),
		};

		return this.prisma.user.create({
			data: user,
		});
	}

	async update(id: string, dto: UserDto) {
		if (!dto) {
			throw new BadRequestException('No data provided');
		}

		let data = dto;

		if (dto.password) {
			data = { ...dto, password: await hash(dto.password) };
		}

		return this.prisma.user.update({
			where: {
				id,
			},
			data,
			select: {
				name: true,
				email: true,
			},
		});
	}
}
