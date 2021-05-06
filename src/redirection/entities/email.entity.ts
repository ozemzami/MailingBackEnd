import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Click } from './click.entity';
import { Unsub } from './unsub.entity';

@Entity()
export class Email {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @OneToMany(
    type => Click,
    click => click.email,
  )
  clicks: Click[];

  @OneToMany(
    type => Unsub,
    unsub => unsub.email,
  )
  unsubs: Unsub[];
}
