import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Email } from './email.entity';
import { Subscription } from './subscription.entity';

@Entity()
export class Unsub {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ip: string;

  @ManyToOne(
    type => Email,
    email => email.unsubs,
    { cascade: true, onDelete: 'CASCADE' },
  )
  email: Email;

  @ManyToOne(
    type => Subscription,
    subscription => subscription.unsubs,
  )
  subscription: Subscription;

  @CreateDateColumn()
  time: Date;
}
