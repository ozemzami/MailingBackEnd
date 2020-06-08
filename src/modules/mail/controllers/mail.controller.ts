import {Body, Controller, Delete, Param, Post} from '@nestjs/common';
import {AddEmailInput} from "../models/input/add-email.input";
import {AddEmailOutput} from "../models/output/add-email.output";
import {MailService} from "../services/mail.service";
import {RemoveEmailOutput} from "../models/output/remove-email.output";

@Controller('api/mail')
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
}
