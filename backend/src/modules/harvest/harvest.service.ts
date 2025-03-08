import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Farm } from '@modules/farm/farm.entity';

import { Harvest } from './harvest.entity';
import { CreateHarvestDto } from './dtos/createHarvest.dto';

@Injectable()
export class HarvestService {
  constructor(
    @InjectRepository(Harvest)
    private harvestRepository: Repository<Harvest>,
    @InjectRepository(Farm)
    private farmRepository: Repository<Farm>,
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
    });
    if (!harvest) {
      throw new NotFoundException('Colheita não encontrada');
    }

    return this.harvestRepository.save({ ...harvest, ...harvestDto });
  }

  async delete(harvestId: string): Promise<void> {
    await this.harvestRepository.delete(harvestId);
  }
}
