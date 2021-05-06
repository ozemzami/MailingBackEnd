import { Injectable } from '@nestjs/common';
import { AddUserInput } from '../../redirection/inputs/add-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/redirection/entities/users.entity';
import { UserOutput } from '../outputs/user.output';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}
  async addUser(addUserInput: AddUserInput) {
    let user = this.userRepository.create();
    user.email = addUserInput.email;
    user.password = addUserInput.password;
    user.role = addUserInput.role;

    return await this.userRepository.save(user);
  }

  async getAllUsers() {
    let users: UserOutput[] = await this.userRepository.find();
    return users;
  }

  async getUser(emailString: string) {
    let email = await this.userRepository.findOne({
      email: emailString,
    });

    return email;
  }

  async getUserById(id: string) {
    try {
      return await this.userRepository.findOne({
        id: id,
      });
    } catch (e) {
      return null;
    }
  }

  async deleteUser(userId: string) {
    return await this.userRepository.delete(userId);
  }
}
