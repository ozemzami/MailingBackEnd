import { Controller, Post, Body, Get, UseGuards, Delete, Param } from '@nestjs/common';
import { AddOfferInput } from '../inputs/add-offer.input';
import { OfferService } from '../services/offer.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('api/offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async addOffer(@Body() addOfferInput: AddOfferInput) {
    let offer = await this.offerService.addOffer(addOfferInput);
    return offer;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllOffers() {
    return await this.offerService.getAllOffers();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:offerId')
  async deleteOffer( @Param('offerId') offerId: string) {
    return await this.offerService.deleteOffer(offerId);
  }
}
