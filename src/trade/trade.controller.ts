import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EmailService } from 'src/email/email.service';
import { EmailReceivedEvent } from 'src/email/events/email-received.event';
import { TradeService } from './trade.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { CreateTradesDto } from './dto/create-trades.dto';
import { UserService } from 'src/user/user.service';

@Controller('trade')
export class TradeController {
  constructor(
    private readonly tradeService: TradeService,
    private readonly emailService: EmailService,
    private readonly userService: UserService,
  ) {}

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.tradeService.trade(id);
  }

  @Get()
  async findAll() {
    return await this.tradeService.trades();
  }

  @Post()
  async createTrade(@Body() tradeRawData: CreateTradeDto) {
    const { emailId, userId } = tradeRawData;

    const tradeData = {
      ...tradeRawData,
      email: { connect: { id: emailId } },
      user: { connect: { id: userId } },
    };

    const trade = await this.tradeService.createTrade(tradeData);
    return trade;
  }

  @Post('/tradesForAll')
  async createTradeForAll(@Body() tradeRawData: CreateTradesDto) {
    const { emailId } = tradeRawData;

    const users = await this.userService.users();
    const userIds = users.map((user) => user.id);

    const tradesData = userIds.map((userId) => ({
      ...tradeRawData,
      email: { connect: { id: emailId } },
      user: { connect: { id: userId } },
    }));

    return await this.tradeService.createTrades(tradesData);
  }

  @OnEvent('email.received')
  async parseTradeData(payload: EmailReceivedEvent) {
    const { emailId } = payload;

    const { textBody, htmlBody } = await this.emailService.email({
      id: emailId,
    });

    console.log(textBody, htmlBody);
  }
}
