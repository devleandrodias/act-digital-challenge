import {
  Put,
  Get,
  Post,
  Body,
  Param,
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
  async findAll(@Param() { producerId }: { producerId: string }) {
    return this.farmService.findAllByProducer(producerId);
  }

  @Post(':producerId')
  async create(
    @Body() farmDto: CreateFarmDto,
    @Param() { producerId }: { producerId: string },
  ) {
    return this.farmService.create(producerId, farmDto);
  }

  @Put(':farmId')
  async update(
    @Body() farmDto: UpdateFarmDto,
    @Param() { farmId }: { farmId: string },
  ) {
    return this.farmService.update(farmId, farmDto);
  }

  @Delete(':farmId')
  async delete(@Param() { farmId }: { farmId: string }) {
    return this.farmService.delete(farmId);
  }
}
