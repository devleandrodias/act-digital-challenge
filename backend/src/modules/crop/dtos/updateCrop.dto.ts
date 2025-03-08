import { PartialType } from '@nestjs/swagger';

import { CreateCropDto } from './createCrop.dto';

export class UpdateCropDto extends PartialType(CreateCropDto) {}
