import {ApiProperty} from "@nestjs/swagger";
import {IsDate, IsEmail, IsInt} from "class-validator";

export class AddEmailInput {

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    userName: string;

    @IsInt()
    @ApiProperty()
    mount: number;

    @IsInt()
    @ApiProperty()
    day: number;

    @IsInt()
    @ApiProperty()
    year: number;

    @ApiProperty()
    password: string;

    @ApiProperty()
    isp: string;

    @IsDate()
    @ApiProperty()
    createdAt: Date;

    @IsEmail()
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
