import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Query,
  Delete,
  Controller,
} from '@nestjs/common';

import { PaginateQuery } from 'nestjs-paginate';

import { ProducerService } from './producer.service';
import { CreateProducerDto } from './dtos/createProducer.dto';
import { UpdateProducerDto } from './dtos/updateProducer.dto';

@Controller('producers')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Get()
  async findAll(@Query() query: PaginateQuery) {
    return this.producerService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.producerService.findOne(id);
  }

  @Post()
  async create(@Body() payload: CreateProducerDto) {
    return this.producerService.create(payload);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() producer: UpdateProducerDto) {
    return this.producerService.update(id, producer);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.producerService.delete(id);
  }
}
