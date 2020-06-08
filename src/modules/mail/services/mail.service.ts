import {Injectable} from '@nestjs/common';
import {AddEmailInput} from "../models/input/add-email.input";
import {Email} from "../models/entities/email.entity";
import { InjectRepository} from '@nestjs/typeorm'
import {Repository} from "typeorm";
import {List} from "../models/entities/list.entity";
import {RemoveEmailOutput} from "../models/output/remove-email.output";

@Injectable()
export class MailService {
    constructor( @InjectRepository(Email) private readonly emailRepository: Repository<Email>) {}

    async addEmail(addEmailInput: AddEmailInput): Promise<Email> {
        const email = await this.emailRepository.create(addEmailInput);
        return await this.emailRepository.save(email)
    }

    async getListsOfEmail(EmailID: number): Promise<List[]> {
        const email: Email = await this.emailRepository.findOne({where: {id: EmailID}, relations: ['lists']});
        return email.lists;
    }

    async removeEmail(EmailID: number): Promise<RemoveEmailOutput> {
        const email: Email = await this.emailRepository.findOne({where: {id: EmailID}});
        await this.emailRepository.remove(email);
        return new RemoveEmailOutput();
    }
}