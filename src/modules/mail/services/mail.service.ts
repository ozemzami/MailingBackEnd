import {Injectable} from '@nestjs/common';
import {AddEmailInput} from "../models/input/add-email.input";
import {Email} from "../models/entities/email.entity";
import { InjectRepository} from '@nestjs/typeorm'
import {Repository} from "typeorm";

@Injectable()
export class MailService {
    constructor( @InjectRepository(Email) private readonly emailRepository: Repository<Email>) {}

    async addEmail(addEmailInput: AddEmailInput): Promise<Email> {
        const email = await this.emailRepository.create(addEmailInput);
        return await this.emailRepository.save(email)
    }
}
