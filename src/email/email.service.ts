import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServerClient } from 'postmark';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {}

  async sendSimpleMessage() {
    const apiKey = this.configService.get<string>('PM_API_KEY', '');
    const client = new ServerClient(apiKey);

    await client.sendEmail({
      From: 'tm@tony-masek.com',
      To: 'tm@tony-masek.com',
      Subject: 'Hello from Postmark',
      HtmlBody: '<strong>Hello</strong> dear Postmark user.',
      TextBody: 'Hello from Postmark!',
      MessageStream: 'outbound',
    });
  }
}
