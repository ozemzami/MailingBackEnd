import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unsub } from '../entities/unsub.entity';

@Injectable()
export class UnsubService {
  constructor(
    @InjectRepository(Unsub)
    private unsubRepository: Repository<Unsub>,
  ) {}

  async addUnsub(email, sub, ip) {
    let unsub = await this.unsubRepository.create();
    unsub.email = email;
    unsub.subscription = sub;
    unsub.ip = ip;
    return await this.unsubRepository.save(unsub);
  }

  async getUnsubsBySub(sub) {
    let unsubs = await this.unsubRepository.find({
      relations: ['email', 'subscription'],
      where: {
        subscription: sub.id,
      },
    });
    return unsubs;
  }
}
