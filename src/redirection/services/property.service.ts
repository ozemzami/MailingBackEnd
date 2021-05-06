import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '../entities/subscription.entity';
import { Property } from '../entities/property.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

  async addProperty(
    indexName: string,
    value: string,
    subscription: Subscription,
  ): Promise<Property> {
    let property = this.propertyRepository.create();
    property.indexName = indexName;
    property.value = value;
    property.subscription = subscription;
    return await this.propertyRepository.save(property);
  }

  async getProeprtiesBySubscription(
    subscription: Subscription,
  ): Promise<Property[]> {
    let properties = this.propertyRepository.find({
      relations: ['subscription'],
      where: {
        subscription: subscription.id,
      },
    });
    return properties;
  }

  async deleteProperty(propertyId: string) {
    return await this.propertyRepository.delete(propertyId);
  }
}
