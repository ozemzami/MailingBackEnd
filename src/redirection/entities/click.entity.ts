import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { Email } from './email.entity';
import { Subscription } from './subscription.entity';

@Entity()
export class Click {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ip: string;
  @ManyToOne(
    type => Email,
    email => email.clicks,
    { cascade: true, onDelete: 'CASCADE' },
  )
  email: Email;

  @ManyToOne(
    type => Subscription,
    subscription => subscription.clicks,
  )
  subscription: Subscription;

  @CreateDateColumn()
  time: Date;
}
