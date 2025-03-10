import { Type } from 'class-transformer';
import { IsNotEmpty, IsArray, ValidateNested } from 'class-validator';

import { CreateCropDto } from 'src/modules/crop/dtos/createCrop.dto';

export class CreateHarvestDto {
  @IsNotEmpty()
  year: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCropDto)
  crops: CreateCropDto[];
}
