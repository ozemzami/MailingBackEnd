import { Module } from '@nestjs/common';
import { MailController } from './controllers/mail.controller';
import { MailService } from './services/mail.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import {Email} from "./models/entities/email.entity";

@Module({
  imports: [
      TypeOrmModule.forFeature([Email])
  ],
  controllers: [MailController],
  providers: [
      MailService,
  ]
})
export class MailModule {}
