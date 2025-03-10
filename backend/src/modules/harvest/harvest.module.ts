import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Harvest } from './harvest.entity';
import { Crop } from '../crop/crop.entity';
import { Farm } from '../farm/farm.entity';

import { HarvestService } from './services/harvest.service';
import { HarvestController } from './harvest.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Harvest, Farm, Crop])],
  controllers: [HarvestController],
  providers: [HarvestService],
})
export class HarvestModule {}
