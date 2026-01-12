import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import emailConfig from './config/email.config';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [ConfigModule.forFeature(emailConfig), PrismaModule],
  exports: [EmailService],
  providers: [EmailService],
  controllers: [EmailController],
})
export class EmailModule {}
