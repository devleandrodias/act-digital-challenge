import { Controller, Get, Query } from '@nestjs/common';
import { FarmService } from './farm.service';

@Controller('farms')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @Get(':producerId')
  async findAll(@Query() { producerId }: { producerId: string }) {
    return this.farmService.findAllByProducer(producerId);
  }
}
