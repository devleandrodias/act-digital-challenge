import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

import { Producer } from './producer.entity';
import { CreateProducerDto } from './dtos/createProducer.dto';

@Injectable()
export class ProducerService {
  constructor(
    @InjectRepository(Producer)
    private producerRepository: Repository<Producer>,
  ) {}

  async findAll(query: PaginateQuery): Promise<Paginated<Producer>> {
    return paginate(query, this.producerRepository, {
      sortableColumns: ['name', 'document'],
      searchableColumns: ['name', 'document'],
      relations: ['farms', 'farms.harvests', 'farms.harvests.crops'],
    });
  }

  async findOne(id: string): Promise<Producer> {
    const producer = await this.producerRepository.findOne({
      where: { id },
      relations: ['farm'],
    });

    if (!producer) {
      throw new NotFoundException('Produtor não encontrado');
    }

    return producer;
  }

  async create(producerDto: CreateProducerDto): Promise<Producer> {
    const producer = this.producerRepository.create(producerDto);
    return this.producerRepository.save(producer);
  }

  async update(id: string, producer: Partial<Producer>): Promise<Producer> {
    // const existingProducer = await this.producerRepository.findOne({
    //   where: { id },
    // });
    // if (!existingProducer) {
    //   throw new NotFoundException('Produtor não encontrado');
    // }
    // Object.assign(existingProducer, producer);
    // return this.producerRepository.save(existingProducer);
    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<void> {
    await this.producerRepository.delete(id);
  }
}
