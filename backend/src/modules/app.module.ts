import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '@configs/typeorm.config';

import { FarmModule } from './farm/farm.module';
import { CropModule } from './crop/crop.module';
import { HarvestModule } from './harvest/harvest.module';
import { ProducerModule } from './producer/producer.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CropModule,
    FarmModule,
    HarvestModule,
    ProducerModule,
    DashboardModule,
  ],
})
export class AppModule {}
