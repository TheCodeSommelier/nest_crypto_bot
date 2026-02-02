import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { TradeService } from './trade.service';
import { TradeController } from './trade.controller';
import { PrismaModule } from 'src/prisma.module';
import { UserModule } from 'src/user/user.module';
import { TradeExecutionFuturesService } from './futures/trade-execution-futures.service';
import { TradeExecutionSpotService } from './spot/trade-execution-spot.service';
import { SecretsModule } from 'src/secrets/secrets.module';

@Module({
  imports: [PrismaModule, UserModule, HttpModule, SecretsModule],
  exports: [TradeService],
  providers: [
    TradeService,
    TradeExecutionFuturesService,
    TradeExecutionSpotService,
  ],
  controllers: [TradeController],
})
export class TradeModule {}
