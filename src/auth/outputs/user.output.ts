import { Role } from 'src/redirection/models/role.enum';

export class UserOutput {
  id: string;

  email: string;

  password: string;

  role: Role;
}
