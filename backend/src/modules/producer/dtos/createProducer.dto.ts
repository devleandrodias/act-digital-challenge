import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  ValidateNested,
  Matches,
  IsOptional,
} from 'class-validator';

// DTOs para validação
export class CreateCropDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class CreateHarvestDto {
  @IsNotEmpty()
  year: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCropDto)
  crops: CreateCropDto[];
}
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
