import { Module } from '@nestjs/common';
import { RedirectController } from './controllers/redirect.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Click } from './entities/click.entity';
import { Unsub } from './entities/unsub.entity';
import { Email } from './entities/email.entity';
import { Offer } from './entities/offer.entity';
import { OfferController } from './controllers/offer.controller';
import { BlacklistController } from './controllers/blacklist.controller';
import { OfferService } from './services/offer.service';
import { EmailService } from './services/email.service';
import { ClickService } from './services/click.service';
import { UnsubService } from './services/unsub.service';
import { BlacklistService } from './services/blacklist.service';
import { Blacklist } from './entities/blacklist.entity';
import { Whitelist } from './entities/whitelist.entity';
import { SubscriptionController } from './controllers/subscription.controller';
import { SubscriptionService } from './services/subscription.service';
import { PropertyService } from './services/property.service';
import { Subscription } from './entities/subscription.entity';
import { Property } from './entities/property.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Click,
      Email,
      Offer,
      Unsub,
      Blacklist,
      Whitelist,
      Subscription,
      Property,
    ]),
  ],
  controllers: [
    RedirectController,
    OfferController,
    BlacklistController,
    SubscriptionController,
  ],
  providers: [
    OfferService,
    SubscriptionService,
    PropertyService,
    EmailService,
    ClickService,
    UnsubService,
    BlacklistService,
  ],
})
export class RedirectionModule {}
