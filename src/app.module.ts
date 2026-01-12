import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { TradeModule } from './trade/trade.module';
import { UserModule } from './user/user.module';
import appConfig from './config/app.config';

@Module({
  imports: [
    EmailModule,
    ConfigModule.forRoot({ load: [appConfig] }),
    EventEmitterModule.forRoot({
      verboseMemoryLeak: true,
    }),
    TradeModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
