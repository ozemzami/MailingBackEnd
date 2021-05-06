import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { PropertyService } from '../services/property.service';
import { SubscriptionService } from '../services/subscription.service';
import { OfferService } from '../services/offer.service';
import { UserService } from 'src/auth/services/user.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AddPropertyInput } from '../inputs/add-property.input';
import bodyParser = require('body-parser');

@Controller('api/sub')
export class SubscriptionController {
  constructor(
    private readonly propertyService: PropertyService,
    private readonly subService: SubscriptionService,
    private readonly offerService: OfferService,
    private readonly userService: UserService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('addProperty')
  async addProperty(@Body() addPropertyInput: AddPropertyInput) {
    let user = await this.userService.getUser(addPropertyInput.userEmail);
    let offer = await this.offerService.getOfferById(addPropertyInput.offerId);
    let subscription = await this.subService.getSubByOfferAndUser(
      offer.id,
      user.id,
    );
    if (subscription) {
      let property = await this.propertyService.addProperty(
        addPropertyInput.indexName,
        addPropertyInput.value,
        subscription,
      );
      return property;
    } else {
      let newSubscription = await this.subService.addSubscription(offer, user);
      let property = await this.propertyService.addProperty(
        addPropertyInput.indexName,
        addPropertyInput.value,
        newSubscription,
      );
      return property;
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('getProperties/:offerId/:userId')
  async getAllproperties(
    @Param('offerId') offerId: string,
    @Param('userId') userId: string,
  ) {
    let subscription = await this.subService.getSubByOfferAndUser(
      offerId,
      userId,
    );
    if (subscription) {
      let properties = await this.propertyService.getProeprtiesBySubscription(
        subscription,
      );
      return properties;
    }
    return [];
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('deleteProperty/:propertyId')
  async deleteProperty(@Param('propertyId') propertyId: string) {
    let clicks = await this.propertyService.deleteProperty(propertyId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/:userId')
  async getAllSubs(@Param('userId') userId: string) {
    return await this.subService.getSubByUser(userId);
  }
}
