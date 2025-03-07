import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Harvest } from '../harvest/harvest.entity';
import { Producer } from '@modules/producer/producer.entity';

@Entity()
export class Farm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column('decimal', { precision: 10, scale: 2 })
  totalArea: number;

  @Column('decimal', { precision: 10, scale: 2 })
  agriculturalArea: number;

  @Column('decimal', { precision: 10, scale: 2 })
  vegetationArea: number;

  @ManyToOne(() => Producer, (producer) => producer.farms, {
    onDelete: 'CASCADE',
  })
  producer: Producer;

  @OneToMany(() => Harvest, (harvest) => harvest.farm, { cascade: true })
  harvests: Harvest[];
}
