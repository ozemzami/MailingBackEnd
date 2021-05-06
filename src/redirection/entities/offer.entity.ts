import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Click } from './click.entity';
import { Unsub } from './unsub.entity';
import { Subscription } from './subscription.entity';
@Entity()
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  link: string;

  @Column()
  unsub: string;

  @OneToMany(
    type => Subscription,
    subscription => subscription.offer,
  )
  subscriptions: Subscription[];
}
