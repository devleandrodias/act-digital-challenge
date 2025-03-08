import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { CreateHarvestDto } from '@modules/harvest/dtos/createHarvest.dto';

export class CreateFarmDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  totalArea: number;

  @IsNotEmpty()
  agriculturalArea: number;

  @IsNotEmpty()
  vegetationArea: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateHarvestDto)
  harvests: CreateHarvestDto[];
}
