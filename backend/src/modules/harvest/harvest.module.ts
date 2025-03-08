import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Farm } from '@modules/farm/farm.entity';

import { Harvest } from './harvest.entity';
import { HarvestService } from './harvest.service';
import { HarvestController } from './harvest.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Harvest, Farm])],
  controllers: [HarvestController],
  providers: [HarvestService],
})
export class HarvestModule {}
