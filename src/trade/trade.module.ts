import { Module } from '@nestjs/common';

import { TradeService } from './trade.service';
import { TradeController } from './trade.controller';
import { EmailModule } from 'src/email/email.module';
import { PrismaModule } from 'src/prisma.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [EmailModule, PrismaModule, UserModule],
  providers: [TradeService],
  controllers: [TradeController],
})
export class TradeModule {}
