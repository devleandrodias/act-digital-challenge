import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Farm } from '@modules/farm/farm.entity';
import { Crop } from '@modules/crop/crop.entity';

@Entity()
export class Harvest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  year: number;

  @ManyToOne(() => Farm, (farm) => farm.harvests, { onDelete: 'CASCADE' })
  farm: Farm;

  @OneToMany(() => Crop, (crop) => crop.harvest, { cascade: true })
  crops: Crop[];
}
