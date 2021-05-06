import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
  Redirect,
  Request,
  Ip,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EmailService } from '../services/email.service';
import { OfferService } from '../services/offer.service';
import { isEmail } from 'class-validator';
import { ClickService } from '../services/click.service';
import { BlacklistService } from '../services/blacklist.service';
import { UnsubService } from '../services/unsub.service';
import { SubscriptionService } from '../services/subscription.service';
import { UserService } from 'src/auth/services/user.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@Controller('api/redirect')
export class RedirectController {
  constructor(
    private readonly emailService: EmailService,
    private readonly offerService: OfferService,
    private readonly clickService: ClickService,
    private readonly unsubService: UnsubService,
    private readonly balcklistService: BlacklistService,
    private readonly subService: SubscriptionService,
    private readonly userService: UserService,
  ) {}

  @Get('click/:offerId/:userId/:email')
  @Redirect('https://www.google.com', 302)
  async click(
    @Param('offerId') offerId: string,
    @Param('userId') userId: string,
    @Param('email') emailString: string,
    @Ip() ip: string,
  ) {
    offerId = offerId.substr( 0, 36 );
    userId = userId.substr( 0, 36 );
    if (!isEmail(emailString)) {
      throw new HttpException(
        "we didn't send this offer to you",
        HttpStatus.BAD_REQUEST,
      );
    }
    let listed = await this.balcklistService.getBlacklistByEmail(emailString);
    if (listed) {
      throw new HttpException(
        "we didn't send this offer to you",
        HttpStatus.BAD_REQUEST,
      );
    }
    let offer = await this.offerService.getOfferById(offerId);
    if (!offer) {
      throw new HttpException(
        'this offer does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    let email = await this.emailService.getEmail(emailString);

    if (!email) {
      email = await this.emailService.addEmail(emailString);
    }

    let user = await this.userService.getUserById(userId);

    if (!user) {
      throw new HttpException('this user does not exist', HttpStatus.NOT_FOUND);
    }

    let sub = await this.subService.getSubByOfferAndUser(offerId, userId);

    if (!sub) {
      sub = await this.subService.addSubscription(offer, user);
    }

    let click = await this.clickService.addClick(email, sub, ip);
    return { url: offer.link };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('clicks/:userId/:offerId')
  async getClicksByOfferAndUser(
    @Param('offerId') offerId: string,
    @Param('userId') userId: string,
  ) {
    let sub = await this.subService.getSubByOfferAndUser(offerId, userId);

    if (!sub) {
      let offer = await this.offerService.getOfferById(offerId);
      let user = await this.userService.getUserById(userId);
      sub = await this.subService.addSubscription(offer, user);
    }
    let clicks = await this.clickService.getClicksBySub(sub);

    await Promise.all(
      clicks.map(async click => {
        click.subscription = await this.subService.getSubById(
          click.subscription.id,
        );
      }),
    );
    return clicks;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('clicks')
  async getClicks() {
    let clicks = await this.clickService.getClicks();

    await Promise.all(
      clicks.map(async click => {
        click.subscription = await this.subService.getSubById(
          click.subscription.id,
        );
      }),
    );
    return clicks;
  }

  @Get('unsub/:offerId/:userId/:email')
  @Redirect('https://www.google.com', 302)
  async unsub(
    @Param('offerId') offerId: string,
    @Param('userId') userId: string,
    @Param('email') emailString: string,
    @Ip() ip: String,
  ) {
    offerId = offerId.substr( 0, 36 );
    userId = userId.substr( 0, 36 );
    if (!isEmail(emailString)) {
      throw new HttpException(
        "we didn't send this offer to you",
        HttpStatus.BAD_REQUEST,
      );
    }
    let listed = await this.balcklistService.getBlacklistByEmail(emailString);
    if (listed) {
      throw new HttpException(
        "we didn't send this offer to you",
        HttpStatus.BAD_REQUEST,
      );
    }
    let offer = await this.offerService.getOfferById(offerId);
    if (!offer) {
      throw new HttpException(
        'this offer does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    let email = await this.emailService.getEmail(emailString);

    if (!email) {
      email = await this.emailService.addEmail(emailString);
    }

    let user = await this.userService.getUserById(userId);

    if (!user) {
      throw new HttpException('this user does not exist', HttpStatus.NOT_FOUND);
    }

    let sub = await this.subService.getSubByOfferAndUser(offerId, userId);

    if (!sub) {
      sub = await this.subService.addSubscription(offer, user);
    }

    await this.unsubService.addUnsub(email, sub, ip);
    return { url: offer.unsub };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('clicks/:userId/:offerId')
  async getUnsubsByOfferAndUser(
    @Param('offerId') offerId: string,
    @Param('userId') userId: string,
  ) {
    let sub = await this.subService.getSubByOfferAndUser(offerId, userId);

    if (!sub) {
      let offer = await this.offerService.getOfferById(offerId);
      let user = await this.userService.getUserById(userId);
      sub = await this.subService.addSubscription(offer, user);
    }
    return await this.unsubService.getUnsubsBySub(sub);
  }

  @Get('shortlink')
  async short(@Req() request: Request) {
    return `
      <html>
        <h1>please wait for redirection...</h1>
        <script>
          console.log(window.location.href)
          var href=window.location.href;
          var path=href.split("#").pop()
          window.location.href = path;
        </script>
      </html>
   
   `;
  }

  @Get('bitly/:id')
  async bitly(@Req() request: Request) {
    return `
      <html>
        <h1>please wait for redirection...</h1>
        <script>
          console.log(window.location.href)
          var href=window.location.href;
          var path=href.split("#").pop()
          window.location.href = path;
        </script>
      </html>
   
   `;
  }
}
