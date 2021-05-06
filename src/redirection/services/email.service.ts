import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Email } from '../entities/email.entity';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(Email)
    private emailRepository: Repository<Email>,
  ) {}

  async getEmail(emailString: string) {
    let email = await this.emailRepository.findOne({
      email: emailString,
    });

    return email;
  }

  async addEmail(emailString) {
    try {
      let email = await this.emailRepository.create();
      email.email = emailString;
      return await this.emailRepository.save(email);
    } catch (e) {
      return null;
    }
  }
}
