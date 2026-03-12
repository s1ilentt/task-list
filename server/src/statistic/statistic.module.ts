import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';
import { TimerModule } from 'src/timer/timer.module';

@Module({
	imports: [TimerModule],
	controllers: [StatisticController],
	providers: [StatisticService, PrismaService],
	exports: [StatisticService],
})
export class StatisticModule {}
