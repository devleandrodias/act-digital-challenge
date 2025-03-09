import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';

import { CropService } from './crop.service';
import { CreateCropDto } from './dtos/createCrop.dto';
import { UpdateCropDto } from './dtos/updateCrop.dto';

@Controller('crops')
export class CropController {
  constructor(private readonly cropService: CropService) {}

  @Get(':harvestId')
  async getCropsByHarvestId(@Param() { harvestId }: { harvestId: string }) {
    return this.cropService.findAllByHarvest(harvestId);
  }

  @Post(':harvestId')
  async createCrop(
    @Param() { harvestId }: { harvestId: string },
    @Body() cropDto: CreateCropDto,
  ) {
    return this.cropService.create(harvestId, cropDto);
  }

  @Put(':id')
  async updateCrop(
    @Param() { id }: { id: string },
    @Body() cropDto: UpdateCropDto,
  ) {
    return this.cropService.update(id, cropDto);
  }

  @Delete(':id')
  async deleteCrop(@Param() { id }: { id: string }) {
    return this.cropService.delete(id);
  }
}
