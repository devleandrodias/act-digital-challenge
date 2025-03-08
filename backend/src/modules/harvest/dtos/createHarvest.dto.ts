import { Type } from 'class-transformer';
import { IsNotEmpty, IsArray, ValidateNested } from 'class-validator';

import { CreateCropDto } from '@modules/producer/dtos/createProducer.dto';

export class CreateHarvestDto {
  @IsNotEmpty()
  year: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCropDto)
  crops: CreateCropDto[];
}
