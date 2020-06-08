import {Column, Entity, ManyToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {Email} from "./email.entity";

@Unique(["name"])
@Entity()
export class List {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @ManyToMany(type => Email, email => email.lists, {onDelete:"CASCADE"})
    emails: Email[];

}
