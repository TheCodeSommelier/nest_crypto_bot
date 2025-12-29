import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';

@Module({
  imports: [EmailModule, ConfigModule.forRoot({ load: [appConfig] })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
