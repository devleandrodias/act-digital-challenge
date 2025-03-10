import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Crop } from '../crop/crop.entity';
import { Farm } from '../farm/farm.entity';

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
