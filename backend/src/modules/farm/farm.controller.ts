import {
  Put,
  Get,
  Post,
  Body,
  Query,
  Delete,
  Controller,
} from '@nestjs/common';

import { FarmService } from './farm.service';
import { CreateFarmDto } from './dtos/createFarm.dto';
import { UpdateFarmDto } from './dtos/updateFarm.dto';

@Controller('farms')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @Get(':producerId')
  async findAll(@Query() { producerId }: { producerId: string }) {
    return this.farmService.findAllByProducer(producerId);
  }

  @Post(':producerId')
  async create(
    @Body() farmDto: CreateFarmDto,
    @Query() { producerId }: { producerId: string },
  ) {
    return this.farmService.create(producerId, farmDto);
  }

  @Put(':farmId')
  async update(
    @Body() farmDto: UpdateFarmDto,
    @Query() { farmId }: { farmId: string },
  ) {
    return this.farmService.update(farmId, farmDto);
  }

  @Delete(':farmId')
  async delete(@Query() { farmId }: { farmId: string }) {
    return this.farmService.delete(farmId);
  }
}
