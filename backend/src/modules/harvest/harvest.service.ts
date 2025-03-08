import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Harvest } from './harvest.entity';

@Injectable()
export class HarvestService {
  constructor(
    @InjectRepository(Harvest)
    private harvestRepository: Repository<Harvest>,
  ) {}

  async findAllByFarm(farmId: string): Promise<Harvest[]> {
    return this.harvestRepository.find({
      where: { farm: { id: farmId } },
    });
  }

  async findOne(id: string): Promise<Harvest> {
    const harvest = await this.harvestRepository.findOne({ where: { id } });

    if (!harvest) {
      throw new NotFoundException('Colheita não encontrada');
    }

    return harvest;
  }
}
