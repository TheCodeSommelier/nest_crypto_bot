import { Module } from '@nestjs/common';

import { TradeDataParserService } from './trade-data-parser.service';
import { TradeDataParserController } from './trade-data-parser.controller';
import { EmailModule } from 'src/email/email.module';
import { PrismaModule } from 'src/prisma.module';
import { TradeModule } from 'src/trade/trade.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [PrismaModule, EmailModule, TradeModule, UserModule],
  providers: [TradeDataParserService],
  controllers: [TradeDataParserController],
})
export class TradeDataParserModule {}
