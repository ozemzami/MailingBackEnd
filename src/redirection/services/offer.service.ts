import { Injectable } from '@nestjs/common';
import { AddOfferInput } from '../inputs/add-offer.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from '../entities/offer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}
  async addOffer(addOfferInput: AddOfferInput) {
    let offer = this.offerRepository.create();
    offer.name = addOfferInput.name;
    offer.link = addOfferInput.link;
    offer.unsub = addOfferInput.unsub;

    return await this.offerRepository.save(offer);
  }

  async getAllOffers() {
    return await this.offerRepository.find();
  }

  async getOfferById(id: string) {
    try {
      return await this.offerRepository.findOne({
        id: id,
      });
    } catch (e) {
      return null;
    }
  }

  async deleteOffer(offerId: string) {
    return await this.offerRepository.delete(offerId);
  }
}
