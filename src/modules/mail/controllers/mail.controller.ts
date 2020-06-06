import {Body, Controller, Post} from '@nestjs/common';
import {AddEmailInput} from "../models/input/add-email.input";
import {AddEmailOutput} from "../models/output/add-email.output";
import {MailService} from "../services/mail.service";

@Controller('api/mail')
export class MailController {
    constructor(private mailService: MailService) {
    }

    @Post()
     async addEmail(@Body() addEmailInput: AddEmailInput): Promise<AddEmailOutput>{
        return await this.mailService.addEmail(addEmailInput);
    }

}
