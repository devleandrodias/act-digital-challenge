import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Farm } from '@modules/farm/farm.entity';
import { Crop } from '@modules/crop/crop.entity';

import { Harvest } from './harvest.entity';
import { CreateHarvestDto } from './dtos/createHarvest.dto';

@Injectable()
export class HarvestService {
  constructor(
    @InjectRepository(Harvest)
    private harvestRepository: Repository<Harvest>,
    @InjectRepository(Farm)
    private farmRepository: Repository<Farm>,
    @InjectRepository(Crop)
    private cropRepository: Repository<Crop>,
  ) {}

  async findAllByFarm(farmId: string): Promise<Harvest[]> {
    return this.harvestRepository.find({
      where: { farm: { id: farmId } },
    });
  }

  async findOne(id: string): Promise<Harvest> {
    const harvest = await this.harvestRepository.findOne({
      where: { id },
    });

    if (!harvest) {
      throw new NotFoundException('Colheita não encontrada');
    }

    return harvest;
  }

  async create(farmId: string, harvestDto: CreateHarvestDto): Promise<Harvest> {
    const farm = await this.farmRepository.findOne({ where: { id: farmId } });
    if (!farm) {
      throw new NotFoundException('Fazenda não encontrada');
    }

    const harvest = this.harvestRepository.create({ ...harvestDto, farm });

    return this.harvestRepository.save(harvest);
  }

  async update(
    harvestId: string,
    harvestDto: CreateHarvestDto,
  ): Promise<Harvest> {
    const harvest = await this.harvestRepository.findOne({
      where: { id: harvestId },
      relations: ['crops'],
    });

    if (!harvest) {
      throw new NotFoundException('Colheita não encontrada');
    }

    const existingCrops = new Map(
      harvest.crops.map((crop) => [crop.name, crop]),
    );

    const updatedCrops = new Set(harvestDto.crops.map((crop) => crop.name));

    const cropsToRemove = harvest.crops.filter(
      (crop) => !updatedCrops.has(crop.name),
    );

    const cropsToAdd = harvestDto.crops
      .filter((crop) => !existingCrops.has(crop.name))
      .map((crop) => this.cropRepository.create({ name: crop.name, harvest }));

    if (cropsToRemove.length > 0) {
      await this.cropRepository.remove(cropsToRemove);
    }

    if (cropsToAdd.length > 0) {
      await this.cropRepository.save(cropsToAdd);
    }

    Object.assign(harvest, harvestDto);

    return this.harvestRepository.save(harvest);
  }

  async delete(harvestId: string): Promise<void> {
    await this.harvestRepository.delete(harvestId);
  }
}
