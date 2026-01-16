import { Module } from '@nestjs/common';

import { TradeService } from './trade.service';
import { TradeController } from './trade.controller';
import { PrismaModule } from 'src/prisma.module';
import { UserModule } from 'src/user/user.module';
import { TradeExecutionFuturesService } from './trade-execution-futures/trade-execution-futures.service';
import { TradeExecutionSpotService } from './trade-execution-spot/trade-execution-spot.service';

@Module({
  imports: [PrismaModule, UserModule],
  exports: [TradeService],
  providers: [TradeService, TradeExecutionFuturesService, TradeExecutionSpotService],
  controllers: [TradeController],
})
export class TradeModule {}
