import { Controller, Get } from '@nestjs/common';

import { DashboardService } from './services/dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  getDashboardData() {
    return this.dashboardService.getDashboardData();
  }
}
