import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producer } from '@modules/producer/producer.entity';

import { Farm } from './farm.entity';
import { FarmService } from './farm.service';
import { FarmController } from './farm.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Farm, Producer])],
  controllers: [FarmController],
  providers: [FarmService],
})
export class FarmModule {}
