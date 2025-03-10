import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Crop } from '../crop.entity';
import { Harvest } from '../../harvest/harvest.entity';

import { CreateCropDto } from '../dtos/createCrop.dto';
import { UpdateCropDto } from '../dtos/updateCrop.dto';

@Injectable()
export class CropService {
  constructor(
    @InjectRepository(Harvest)
    private harvestRepository: Repository<Harvest>,
    @InjectRepository(Crop)
    private cropRepository: Repository<Crop>,
  ) {}

  async findAllByHarvest(harvestId: string): Promise<Crop[]> {
    return this.cropRepository.find({
      where: { harvest: { id: harvestId } },
    });
  }

  async findOne(id: string): Promise<Crop> {
    const crop = await this.cropRepository.findOne({
      where: { id },
    });

    if (!crop) {
      throw new NotFoundException('Cultura não encontrada');
    }

    return crop;
  }

  async create(harvestId: string, cropDto: CreateCropDto): Promise<Crop> {
    const harvest = await this.harvestRepository.findOne({
      where: { id: harvestId },
    });

    if (!harvest) {
      throw new NotFoundException('Safra não encontrada');
    }

    const crop = this.cropRepository.create({ ...cropDto, harvest });

    return this.cropRepository.save(crop);
  }

  async update(cropId: string, cropDto: UpdateCropDto): Promise<Crop> {
    const crop = await this.cropRepository.findOne({
      where: { id: cropId },
    });

    if (!crop) {
      throw new NotFoundException('Cultura não encontrada');
    }

    return this.cropRepository.save({ ...crop, ...cropDto });
  }

  async delete(cropId: string): Promise<void> {
    await this.cropRepository.delete(cropId);
  }
}
