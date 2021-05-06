import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Subscription } from './subscription.entity';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  indexName: string;

  @Column()
  value: string;

  @ManyToOne(
    type => Subscription,
    subscription => subscription.properties,
  )
  subscription: Subscription;
}
