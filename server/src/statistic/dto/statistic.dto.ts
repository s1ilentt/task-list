import { IsEnum } from 'class-validator';
import { EScheduleType } from '../schedule.enum';

export class StatisticDto {
	@IsEnum(EScheduleType)
	type: EScheduleType;
}
