import { Priority } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class TaskDto {
	@IsString()
	@IsOptional()
	name: string;

	@IsBoolean()
	@IsOptional()
	isCompleted?: boolean;

	@IsDateString()
	dueDate: string;

	@IsEnum(Priority)
	@IsOptional()
	@Transform(({ value }) => ('' + value).toLowerCase())
	priority?: Priority;
}
