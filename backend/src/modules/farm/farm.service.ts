import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Farm } from './farm.entity';

@Injectable()
export class FarmService {
  constructor(
    @InjectRepository(Farm)
    private farmRepository: Repository<Farm>,
  ) {}

  async findAllByProducer(producerId: string): Promise<Farm[]> {
    return this.farmRepository.find({
      where: { producer: { id: producerId } },
    });
  }

  async findOne(id: string): Promise<Farm> {
    const farm = await this.farmRepository.findOne({ where: { id } });

    if (!farm) {
      throw new NotFoundException('Fazenda não encontrada');
    }

    return farm;
  }

  async create(farm: Farm): Promise<Farm> {
    return this.farmRepository.save(farm);
  }

  async update(id: string, farm: Farm): Promise<Farm> {
    // await this.farmRepository.update(id, farm);
    // return this.farmRepository.findOne(id);

    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<void> {
    await this.farmRepository.delete(id);
  }
}
