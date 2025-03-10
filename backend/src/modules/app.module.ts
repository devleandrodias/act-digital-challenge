import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FarmModule } from './farm/farm.module';
import { CropModule } from './crop/crop.module';
import { HarvestModule } from './harvest/harvest.module';
import { ProducerModule } from './producer/producer.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { typeOrmConfig } from 'src/configs/typeorm.config';
import { configModuleConfig } from 'src/configs/config.config';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleConfig),
    TypeOrmModule.forRoot(typeOrmConfig),
    CropModule,
    FarmModule,
    HarvestModule,
    ProducerModule,
    DashboardModule,
  ],
})
export class AppModule {}
