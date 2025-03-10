import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Crop } from './crop.entity';
import { Harvest } from '../harvest/harvest.entity';

import { CropService } from './crop.service';
import { CropController } from './crop.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Harvest, Crop])],
  controllers: [CropController],
  providers: [CropService],
})
export class CropModule {}
