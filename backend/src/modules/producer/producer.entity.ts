import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Farm } from '../farm/farm.entity';

@Entity()
export class Producer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  document: string;

  @Column()
  name: string;

  @OneToMany(() => Farm, (farm) => farm.producer, { cascade: true })
  farms: Farm[];
}
