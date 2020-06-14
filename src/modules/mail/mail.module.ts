import { Module } from '@nestjs/common';
import { MailController } from './controllers/mail.controller';
import { MailService } from './services/mail.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import {Email} from "./models/entities/email.entity";
import {List} from "./models/entities/list.entity";
import {ListController} from "./controllers/list.controller";
import {ListService} from "./services/list.service";
import { CsvModule } from 'nest-csv-parser'

@Module({
  imports: [
      CsvModule,
      TypeOrmModule.forFeature([Email, List])
  ],
  controllers: [MailController, ListController],
  providers: [
      MailService,
      ListService
  ]
})
export class MailModule {}
