import { Type } from 'class-transformer';

import {
  IsArray,
  Matches,
  IsString,
  IsOptional,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

import { CreateFarmDto } from '@modules/farm/dtos/createFarm.dto';

// DTOs para validação
export class CreateCropDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class CreateProducerDto {
  @IsNotEmpty()
  @Matches(/^\d{11}$|^\d{14}$/, { message: 'CPF ou CNPJ inválido' })
  document: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateFarmDto)
  farms: CreateFarmDto[];
}
