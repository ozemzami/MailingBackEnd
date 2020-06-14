import {Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {AddEmailInput} from "../models/input/add-email.input";
import {AddEmailOutput} from "../models/output/add-email.output";
import {MailService} from "../services/mail.service";
import {RemoveEmailOutput} from "../models/output/remove-email.output";
import {ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";

@ApiTags('Email')
@Controller('mail')
export class MailController {
    constructor(private mailService: MailService) {
    }

    @Post()
     async addEmail(@Body() addEmailInput: AddEmailInput): Promise<AddEmailOutput>{
        return await this.mailService.addEmail(addEmailInput);
    }

    @Delete(':id')
    async removeEmail(@Param() params): Promise<RemoveEmailOutput>{
        return await this.mailService.removeEmail(params.id);
    }

    @Get('export')
    async exportEmails(): Promise<string> {
        return await this.mailService.exportEmails();
    }
    @Post('import')
    @UseInterceptors(FileInterceptor('file'))
    async importEmails(@UploadedFile() file): Promise<void> {
        return this.mailService.importMails(file.buffer.toString())
    }
}
