import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Email {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    userName: string;

    @Column()
    mount: number;

    @Column()
    day: number;

    @Column()
    year: number;

    @Column()
    password: string;

    @Column()
    isp: string;

    @Column()
    createdAt: Date;

    @Column()
    email: string;

    @Column()
    reply: boolean;

    @Column()
    region: string;

    @Column()
    creation_ip: string;
}
