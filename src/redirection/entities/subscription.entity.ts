import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { Offer } from './offer.entity';
import { Users } from './users.entity';
import { Property } from './property.entity';
import { Click } from './click.entity';
import { Unsub } from './unsub.entity';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(
    type => Property,
    property => property.subscription,
  )
  properties: Property[];

  @ManyToOne(
    type => Offer,
    offer => offer.subscriptions,
  )
  offer: Offer;

  @ManyToOne(
    type => Users,
    users => users.subscriptions,
  )
  user: Users;

  @ManyToOne(
    type => Click,
    click => click.subscription,
  )
  clicks: Click[];

  @ManyToOne(
    type => Unsub,
    unsub => unsub.subscription,
  )
  unsubs: Unsub[];
}
