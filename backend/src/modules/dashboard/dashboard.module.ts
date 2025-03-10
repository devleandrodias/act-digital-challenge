import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Crop } from '../crop/crop.entity';
import { Farm } from '../farm/farm.entity';

import { DashboardService } from './services/dashboard.service';
import { DashboardController } from './dashboard.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Farm, Crop])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
