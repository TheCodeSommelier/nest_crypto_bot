import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { EmailService } from './email.service';

import type { EmailModel } from 'src/generated/prisma/models';
import type { PostmarkInbound } from './types/Postmark';

@Controller('email')
export class EmailController {
  constructor(
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Get()
  findAll(): Promise<EmailModel[]> {
    return this.emailService.emails();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<EmailModel> {
    return this.emailService.email({ id });
  }

  @Post('send')
  send() {
    return this.emailService.sendSimpleMessage();
  }

  // Unnecessary to return the email this is postmark webhook
  @Post()
  async receive(@Body() emailBody: PostmarkInbound) {
    const fromValid =
      emailBody.From === this.configService.get('MY_MAIL') ||
      emailBody.From === this.configService.get('TRADER_MAIL');

    const emailData = {
      from: emailBody.From,
      subject: emailBody.Subject,
      textBody: emailBody.TextBody,
      htmlBody: emailBody.HtmlBody,
      messageId: emailBody.MessageID,
    };

    if (!fromValid) {
      throw new Error('Not a valid sender');
    }

    const email = await this.emailService.createEmail(emailData);
    this.eventEmitter.emit('Email received');

    console.log(email);
  }
}
