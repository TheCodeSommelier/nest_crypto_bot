import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get()
  send() {
    return this.emailService.sendSimpleMessage();
  }

  @Post()
  receive(@Body() emailBody: JSON) {
    console.log('Yuup received');
    console.log('====== Here is the email ======');
    console.log(emailBody);
  }
}
