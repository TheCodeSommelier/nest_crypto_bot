import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigService } from '@nestjs/config';

import type { PostmarkInbound } from './types/Postmark';

@Controller('email')
export class EmailController {
  constructor(
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  @Get()
  send() {
    return this.emailService.sendSimpleMessage();
  }

  @Post()
  receive(@Body() emailBody: PostmarkInbound) {
    const from = emailBody.From;
    const fromValid =
      from === this.configService.get('MY_MAIL') ||
      from === this.configService.get('TRADER_MAIL');

    if (!fromValid) {
      console.warn('Has to be from a valid sender');
    }

    console.log('Yuup received');
    console.log('====== Here is the email ======');
    console.log(emailBody);
  }
}
