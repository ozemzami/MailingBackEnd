import {ApiProperty} from "@nestjs/swagger";

export class AddEmailsInListInput {

    @ApiProperty()
    listID: string;

    @ApiProperty()
    ids: string[];
}
