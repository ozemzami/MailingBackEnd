import {Injectable} from '@nestjs/common';
import {AddEmailInput} from "../models/input/add-email.input";
import {Email} from "../models/entities/email.entity";
import { InjectRepository} from '@nestjs/typeorm'
import {Repository} from "typeorm";
import {List} from "../models/entities/list.entity";
import {RemoveEmailOutput} from "../models/output/remove-email.output";
import { ExportToCsv } from 'export-to-csv';
import * as fs from 'fs';
import {CsvParser} from "nest-csv-parser";
import * as csv from "csvtojson";

@Injectable()
export class MailService {
    constructor( @InjectRepository(Email) private readonly emailRepository: Repository<Email>, private readonly csvParser: CsvParser) {}

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

    async exportEmails() : Promise<string> {
        const emails: Email[] = await this.emailRepository.find();
        const options = {
            fieldSeparator: ';',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true,
            useKeysAsHeaders: true
        };
        const csvExporter = new ExportToCsv(options);
        const data = csvExporter.generateCsv(emails, true);
        fs.writeFileSync('./public/emails.csv', data);
        return 'http://95.111.238.158:3000/emails.csv'
    }

    async importMails(data: string) {

        fs.writeFileSync('./public/importedEmails.csv', data);
        const emails = await csv({delimiter:';'}).fromFile('./public/importedEmails.csv')
        console.log(emails)
        Promise.all(emails.map( email => {
            this.emailRepository.create(email);
            this.emailRepository.save(email);
        }));
    }
}
