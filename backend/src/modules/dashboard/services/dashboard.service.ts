import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Crop } from '../../crop/crop.entity';
import { Farm } from '../../farm/farm.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Farm)
    private farmRepository: Repository<Farm>,
    @InjectRepository(Crop)
    private cropRepository: Repository<Crop>,
  ) {}

  async getDashboardData() {
    const totalFarms = await this.farmRepository.count();
    const totalCrops = await this.cropRepository.count();

    const totalAreaData = await this.farmRepository
      .createQueryBuilder('farm')
      .select('SUM(farm.totalArea)', 'totalArea')
      .addSelect('SUM(farm.agriculturalArea)', 'agriculturalArea')
      .addSelect('SUM(farm.vegetationArea)', 'vegetationArea')
      .getRawOne<{
        totalArea: number;
        agriculturalArea: number;
        vegetationArea: number;
      }>();

    const farmsByState = await this.farmRepository
      .createQueryBuilder('farm')
      .select('farm.state', 'name')
      .addSelect('CAST(COUNT(*) AS INTEGER)', 'value')
      .groupBy('farm.state')
      .getRawMany<{
        name: string;
        value: number;
      }>();

    const cropsByType = await this.cropRepository
      .createQueryBuilder('crop')
      .select('crop.name', 'name')
      .addSelect('CAST(COUNT(*) AS INTEGER)', 'value')
      .groupBy('crop.name')
      .getRawMany<{
        name: string;
        value: number;
      }>();

    const totalArea = Number(totalAreaData?.totalArea || 0);
    const agriculturalArea = Number(totalAreaData?.agriculturalArea || 0);
    const vegetationArea = Number(totalAreaData?.vegetationArea || 0);
    const unidentifiedArea = Number(
      totalArea - (agriculturalArea + vegetationArea),
    );

    return {
      totalFarms,
      totalArea,
      totalCrops,
      agriculturalArea,
      vegetationArea,
      unidentifiedArea: unidentifiedArea > 0 ? unidentifiedArea : 0,
      farmsByState: farmsByState.map((state) => ({
        name: state.name,
        value: Number(state.value),
      })),
      cropsByType: cropsByType.map((crop) => ({
        name: crop.name,
        value: Number(crop.value),
      })),
    };
  }
}
