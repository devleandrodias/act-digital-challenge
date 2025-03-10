import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';

import { HarvestService } from './services/harvest.service';
import { CreateHarvestDto } from './dtos/createHarvest.dto';

@Controller('harvests')
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) {}

  @Get(':farmId')
  async getHarvestsByFarmId(@Param() { farmId }: { farmId: string }) {
    return this.harvestService.findAllByFarm(farmId);
  }

  @Post(':farmId')
  async createHarvest(
    @Param() { farmId }: { farmId: string },
    @Body() harvestDto: CreateHarvestDto,
  ) {
    return this.harvestService.create(farmId, harvestDto);
  }

  @Put(':harvestId')
  async updateHarvest(
    @Param() { harvestId }: { harvestId: string },
    @Body() harvestDto: CreateHarvestDto,
  ) {
    return this.harvestService.update(harvestId, harvestDto);
  }

  @Delete(':harvestId')
  async deleteHarvest(@Param() { harvestId }: { harvestId: string }) {
    return this.harvestService.delete(harvestId);
  }
}
