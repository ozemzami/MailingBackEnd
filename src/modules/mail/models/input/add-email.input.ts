import {ApiProperty} from "@nestjs/swagger";

export class AddEmailInput {

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    userName: string;

    @ApiProperty()
    mount: number;

    @ApiProperty()
    day: number;

    @ApiProperty()
    year: number;

    @ApiProperty()
    password: string;

    @ApiProperty()
    isp: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    email: string;

    @ApiProperty({
        default: true,
    })
    reply: boolean;

    @ApiProperty()
    region: string;

    @ApiProperty()
    creation_ip: string;
}
