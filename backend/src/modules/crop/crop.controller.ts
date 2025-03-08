import { Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';

import { CropService } from './crop.service';
import { CreateCropDto } from './dtos/createCrop.dto';
import { UpdateCropDto } from './dtos/updateCrop.dto';

@Controller('crops')
export class CropController {
  constructor(private readonly cropService: CropService) {}

  @Get(':harvestId')
  async getCropsByHarvestId(@Query() { harvestId }: { harvestId: string }) {
    return this.cropService.findAllByHarvest(harvestId);
  }

  @Post(':harvestId')
  async createCrop(
    @Query() { harvestId }: { harvestId: string },
    @Query() cropDto: CreateCropDto,
  ) {
    return this.cropService.create(harvestId, cropDto);
  }

  @Put(':id')
  async updateCrop(
    @Query() { id }: { id: string },
    @Query() cropDto: UpdateCropDto,
  ) {
    return this.cropService.update(id, cropDto);
  }

  @Delete(':id')
  async deleteCrop(@Query() { id }: { id: string }) {
    return this.cropService.delete(id);
  }
}
