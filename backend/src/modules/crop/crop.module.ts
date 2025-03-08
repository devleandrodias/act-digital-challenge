import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Harvest } from '@modules/harvest/harvest.entity';

import { Crop } from './crop.entity';
import { CropService } from './crop.service';
import { CropController } from './crop.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Harvest, Crop])],
  controllers: [CropController],
  providers: [CropService],
})
export class CropModule {}
