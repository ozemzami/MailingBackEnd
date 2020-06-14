import {Body, Controller, Get, Post, Param } from "@nestjs/common";
import {AddListInput} from "../models/input/add-list.input";
import {AddListOutput} from "../models/output/add-list.output";
import {ListService} from "../services/list.service";
import {Email} from "../models/entities/email.entity";
import {AddEmailsInListInput} from "../models/input/add-emails-in-list.input";
import {List} from "../models/entities/list.entity";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('List')
@Controller('list')
export class ListController {
    constructor(private listService: ListService) {
    }

    @Post()
    async addList(@Body() addListInput: AddListInput): Promise<AddListOutput>{
        return await this.listService.addList(addListInput);
    }

    @Post()
    async addEmailsInList(@Body() addEmailsInListInput: AddEmailsInListInput): Promise<List> {
        return await this.listService.addEmailsInList(addEmailsInListInput);
    }

    @Get(':listID')
    async getEmailsOfList(@Param() params): Promise<Email[]> {
        return await this.listService.getEmailsOfList(params.listID);
    }

}
