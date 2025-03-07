import { IsString } from 'class-validator';

export class UpdateProducerDto {
  @IsString()
  name?: string;
}
