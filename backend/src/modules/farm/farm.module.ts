import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Farm } from './farm.entity';
import { FarmService } from './farm.service';
import { FarmController } from './farm.controller';
import { Producer } from '../producer/producer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Farm, Producer])],
  controllers: [FarmController],
  providers: [FarmService],
})
export class FarmModule {}
