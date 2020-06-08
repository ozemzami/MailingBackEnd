import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {List} from "../models/entities/list.entity";
import {AddListInput} from "../models/input/add-list.input";
import {Email} from "../models/entities/email.entity";
import {AddEmailsInListInput} from "../models/input/add-emails-in-list.input";
import { uniq } from 'lodash'


@Injectable()
export class ListService {
    constructor( @InjectRepository(List) private readonly listRepository: Repository<List>,
                 @InjectRepository(Email) private readonly emailRepository: Repository<Email>
                 ) {}

    async addList(addListInput: AddListInput): Promise<List> {
        const list = await this.listRepository.create(addListInput);
        return await this.listRepository.save(list)
    }

    async getEmailsOfList(listID: number): Promise<Email[]> {
        const list: List = await this.listRepository.findOne({where: {id: listID}, relations: ['emails']});
        return list.emails;
    }

    async addEmailsInList(addEmailsInListInput: AddEmailsInListInput): Promise<List> {
        const list: List = await this.listRepository.findOne({where: {id: addEmailsInListInput.listID}, relations: ['emails']});
        const emails: Email[] = await this.emailRepository.findByIds(addEmailsInListInput.ids);
        list.emails = uniq(list.emails.concat(emails));
        return await this.listRepository.save(list)
    }
}
