import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { TradeModule } from './trade/trade.module';
import { UserModule } from './user/user.module';
import { TradeDataParserModule } from './trade-data-parser/trade-data-parser.module';
import appConfig from './config/app.config';
import { PostmarkAuthMiddleware } from './webhooks/postmark-auth.middleware';
import { SecretsModule } from './secrets/secrets.module';

@Module({
  imports: [
    EmailModule,
    ConfigModule.forRoot({ load: [appConfig] }),
    EventEmitterModule.forRoot({ verboseMemoryLeak: true }),
    TradeModule,
    UserModule,
    TradeDataParserModule,
    SecretsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PostmarkAuthMiddleware)
      .forRoutes({ path: 'email', method: RequestMethod.POST });
  }
}
