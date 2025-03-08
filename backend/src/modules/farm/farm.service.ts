import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Producer } from '@modules/producer/producer.entity';

import { Farm } from './farm.entity';
import { CreateFarmDto } from './dtos/createFarm.dto';
import { UpdateFarmDto } from './dtos/updateFarm.dto';

@Injectable()
export class FarmService {
  constructor(
    @InjectRepository(Farm)
    private farmRepository: Repository<Farm>,
    @InjectRepository(Producer)
    private producerRepository: Repository<Producer>,
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

  async create(producerId: string, farmDto: CreateFarmDto): Promise<Farm> {
    const producer = await this.producerRepository.findOne({
      where: { id: producerId },
    });

    if (!producer) {
      throw new NotFoundException('Produtor não encontrado');
    }

    const farm = this.farmRepository.create({ ...farmDto, producer });

    return this.farmRepository.save(farm);
  }

  async update(farmId: string, farmDto: UpdateFarmDto): Promise<Farm> {
    const farm = await this.farmRepository.findOne({
      where: { id: farmId },
    });
    if (!farm) {
      throw new NotFoundException('Fazenda não encontrada');
    }

    return this.farmRepository.save({ ...farm, ...farmDto });
  }

  async delete(farmId: string): Promise<void> {
    await this.farmRepository.delete(farmId);
  }
}
