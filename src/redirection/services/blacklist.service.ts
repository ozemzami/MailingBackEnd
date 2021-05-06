import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blacklist } from '../entities/blacklist.entity';
import { Repository } from 'typeorm';
import { Email } from '../entities/email.entity';
@Injectable()
export class BlacklistService {
  constructor(
    @InjectRepository(Blacklist)
    private blacklistRepository: Repository<Blacklist>,
    @InjectRepository(Email)
    private emailRepository: Repository<Email>,
  ) {}

  async addToBlacklist(email: Email) {
    let blacklist = await this.blacklistRepository.create();
    blacklist.email = email.email;
    let listed = await this.blacklistRepository.save(blacklist);
    this.emailRepository
      .findOne({
        id: email.id,
      })
      .then(e => {
        this.emailRepository.remove(e);
      });

    return listed;
  }

  async getBlacklistByEmail(emailString: string) {
    return await this.blacklistRepository.findOne({
      email: emailString,
    });
  }
}
