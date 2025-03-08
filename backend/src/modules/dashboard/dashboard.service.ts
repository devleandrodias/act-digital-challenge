import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  getDashboardData() {
    return {
      totalFarms: 20,
      totalArea: 653,
      totalCrops: 4,
    };
  }
}
