import {
  Get,
  Put,
  Body,
  Post,
  Query,
  Delete,
  Controller,
} from '@nestjs/common';

import { HarvestService } from './harvest.service';
import { CreateHarvestDto } from './dtos/createHarvest.dto';

@Controller('harvests')
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) {}

  @Get(':farmId')
  async getHarvestsByFarmId(@Query() { farmId }: { farmId: string }) {
    return this.harvestService.findAllByFarm(farmId);
  }

  @Post(':farmId')
  async createHarvest(
    @Query() { farmId }: { farmId: string },
    @Body() harvestDto: CreateHarvestDto,
  ) {
    return this.harvestService.create(farmId, harvestDto);
  }

  @Put(':harvestId')
  async updateHarvest(
    @Query() { harvestId }: { harvestId: string },
    @Body() harvestDto: CreateHarvestDto,
  ) {
    return this.harvestService.update(harvestId, harvestDto);
  }

  @Delete(':harvestId')
  async deleteHarvest(@Query() { harvestId }: { harvestId: string }) {
    return this.harvestService.delete(harvestId);
  }
}
