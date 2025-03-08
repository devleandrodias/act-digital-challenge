import { PartialType } from '@nestjs/swagger';

import { CreateFarmDto } from './createFarm.dto';

export class UpdateFarmDto extends PartialType(CreateFarmDto) {}
