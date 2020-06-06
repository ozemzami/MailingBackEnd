import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
      CoreModule,
      MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
