import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import emailConfig from './email.config.ts/email.config';

@Module({
  imports: [ConfigModule.forFeature(emailConfig)],
  providers: [EmailService],
  controllers: [EmailController],
})
export class EmailModule {}
