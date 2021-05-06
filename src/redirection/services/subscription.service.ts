import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from '../entities/subscription.entity';
import { Offer } from '../entities/offer.entity';
import { Users } from '../entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private subRepository: Repository<Subscription>,
  ) {}

  async addSubscription(offer: Offer, user: Users): Promise<Subscription> {
    let sub = this.subRepository.create();
    sub.offer = offer;
    sub.user = user;
    return await this.subRepository.save(sub);
  }

  async getSubByOfferAndUser(
    offerId: string,
    userId: string,
  ): Promise<Subscription> {
    let sub = await this.subRepository.find({
      relations: ['offer', 'user'],
      where: {
        offer: offerId,
        user: userId,
      },
    });
    return sub[0];
  }

  async getSubById(subscriptionId: string): Promise<Subscription> {
    let sub = await this.subRepository.find({
      relations: ['offer', 'user'],
      where: {
        id: subscriptionId,
      },
    });

    return sub[0];
  }

  async getSubByUser(userId: string): Promise<Subscription[]> {
    let sub = await this.subRepository.find({
      relations: ['offer', 'user'],
      where: {
        user: userId,
      },
    });
    return sub;
  }
}
