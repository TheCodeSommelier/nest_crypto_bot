import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServerClient } from 'postmark';
import { PrismaService } from 'src/prisma.service';
import {
  EmailCreateInput,
  EmailModel,
  EmailWhereUniqueInput,
} from 'src/generated/prisma/models';

@Injectable()
export class EmailService {
  constructor(
    private readonly configService: ConfigService,
    private prisma: PrismaService,
  ) {}

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

  async email(where: EmailWhereUniqueInput): Promise<EmailModel> {
    return await this.prisma.email.findFirstOrThrow({
      where,
    });
  }

  async emails(): Promise<EmailModel[]> {
    return await this.prisma.email.findMany();
  }

  async createEmail(data: EmailCreateInput): Promise<EmailModel> {
    const email = await this.prisma.email.create({
      data,
    });

    return email;
  }
}
