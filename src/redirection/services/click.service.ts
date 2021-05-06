import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Click } from '../entities/click.entity';
import { Email } from '../entities/email.entity';
import { Subscription } from '../entities/subscription.entity';

@Injectable()
export class ClickService {
  constructor(
    @InjectRepository(Click)
    private clickRepository: Repository<Click>,
  ) { }

  async getClicksByEmailAndSub(email: Email, sub: Subscription) {
    let clicks = await this.clickRepository.find({
      relations: ['email', 'subscription'],
      where: {
        email: email.id,
        subscription: sub.id,
      },
    });
    return clicks;
  }

  async addClick(email: Email, sub: Subscription, ip: string) {
    let click = await this.clickRepository.create();
    click.email = email;
    click.subscription = sub;
    click.ip = ip;

    return await this.clickRepository.save(click);
  }

  async getClicksBySub(sub: Subscription) {
    let clicks = await this.clickRepository.find({
      relations: ['email', 'subscription'],
      where: {
        subscription: sub.id,
      },
    });
    return clicks;
  }

  async getClicks() {
    let clicks = await this.clickRepository.find({
      relations: ['email', 'subscription'],
    });
    return clicks;
  }
}
