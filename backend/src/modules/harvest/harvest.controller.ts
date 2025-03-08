import { Controller, Get, Query } from '@nestjs/common';
import { HarvestService } from './harvest.service';

@Controller('harvests')
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) {}

  @Get(':farmId')
  async getHarvestsByFarmId(@Query() { farmId }: { farmId: string }) {
    return this.harvestService.findAllByFarm(farmId);
  }
}
