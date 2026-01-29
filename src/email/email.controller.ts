import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import {
  EventEmitter2,
  EventEmitterReadinessWatcher,
} from '@nestjs/event-emitter';

import { EmailService } from './email.service';

import type { EmailModel } from 'src/generated/prisma/models';
import type { PostmarkInbound } from './types/Postmark';
import { EmailReceivedEvent } from './events/email-received.event';

@Controller('email')
export class EmailController {
  private readonly logger = new Logger(EmailController.name);

  constructor(
    private readonly emailService: EmailService,
    private readonly eventEmitter: EventEmitter2,
    private readonly eventEmitterReadinessWatcher: EventEmitterReadinessWatcher,
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

  @Post()
  async receive(@Body() emailBody: PostmarkInbound) {
    const emailData = {
      from: emailBody.From,
      subject: emailBody.Subject,
      textBody: emailBody.TextBody,
      htmlBody: emailBody.HtmlBody,
      messageId: emailBody.MessageID,
    };

    const email = await this.emailService.createEmail(emailData);

    await this.eventEmitterReadinessWatcher.waitUntilReady();
    this.eventEmitter.emit('email.received', new EmailReceivedEvent(email.id));

    this.logger.debug(email);
  }
}
