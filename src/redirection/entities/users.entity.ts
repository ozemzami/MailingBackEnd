import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Role } from '../models/role.enum';
import { Subscription } from './subscription.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @OneToMany(
    type => Subscription,
    subscription => subscription.user,
  )
  subscriptions: Subscription[];
}
