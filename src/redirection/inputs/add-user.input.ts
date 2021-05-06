import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../models/role.enum';

export class AddUserInput {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ enum: ['ADMIN', 'USER'] })
  role: Role;
}
