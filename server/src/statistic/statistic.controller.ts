import { Controller, Get, Query } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { StatisticDto } from './dto/statistic.dto';

@Controller('user/statistic')
export class StatisticController {
	constructor(private readonly statisticService: StatisticService) {}

	@Get()
	@Auth()
	async getAll(@CurrentUser('id') id: string) {
		return this.statisticService.getAllStatistics(id);
	}

	@Get('schedule')
	@Auth()
	async getSchedule(@CurrentUser('id') id: string, @Query() dto: StatisticDto) {
		return this.statisticService.getStatisticsForSchedule(id, dto.type);
	}
}
