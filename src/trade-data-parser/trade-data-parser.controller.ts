import { BadRequestException, Controller, Logger } from '@nestjs/common';
import {
  EventEmitter2,
  EventEmitterReadinessWatcher,
  OnEvent,
} from '@nestjs/event-emitter';

import { EmailService } from 'src/email/email.service';
import { EmailReceivedEvent } from 'src/email/events/email-received.event';
import { TradeDataParserService } from './trade-data-parser.service';
import { TradeDataParsedEvent } from './events/trade-data-parsed.event';
import { TradeService } from 'src/trade/trade.service';

@Controller('trade-data-parser')
export class TradeDataParserController {
  private readonly logger = new Logger(TradeDataParserController.name);

  constructor(
    private readonly emailService: EmailService,
    private readonly tradeDataParserService: TradeDataParserService,
    private readonly eventEmitter: EventEmitter2,
    private readonly eventEmitterReadinessWatcher: EventEmitterReadinessWatcher,
    private readonly tradeService: TradeService,
  ) {}

  @OnEvent('email.received')
  async parseEmail(payload: EmailReceivedEvent) {
    const { emailId } = payload;

    const email = await this.emailService.email({
      id: emailId,
    });

    if (!email.textBody && !email.htmlBody) {
      throw new BadRequestException('No text body nor html found');
    }

    try {
      const parsedEmail = this.tradeDataParserService.parseEmail(email);
      this.logger.debug(`Parsed email ${email.id}`);
      this.logger.debug(JSON.stringify(parsedEmail));

      const tradeSignalData = {
        ...parsedEmail,
        entryPortfolioPct: this.toBasisPoints(parsedEmail.entryPortfolioPct),
        averagePortfolioPct: this.toBasisPoints(
          parsedEmail.averagePortfolioPct,
        ),
        email: { connect: { id: email.id } },
      };

      const tradeSignal =
        await this.tradeService.createTradeSignal(tradeSignalData);

      await this.eventEmitterReadinessWatcher.waitUntilReady();

      this.eventEmitter.emit(
        'tradeSignal.parsed',
        new TradeDataParsedEvent(tradeSignal.id),
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unknown parsing error';
      this.logger.error(`Failed to parse email ${email.id}: ${message}`);
      throw error;
    }
  }

  // ======= HELPERS =======

  private toBasisPoints(value?: number | null): number | null {
    if (value == null) return null;
    return Math.round(value * 100);
  }
}
