import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Harvest } from '../harvest/harvest.entity';

@Entity()
export class Crop {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Harvest, (harvest) => harvest.crops, { onDelete: 'CASCADE' })
  harvest: Harvest;
}
