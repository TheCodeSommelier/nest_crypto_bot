import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import basicAuth from 'basic-auth';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostmarkAuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, _res: Response, next: NextFunction) {
    const creds = basicAuth(req);

    const expectedUser = this.configService.get<string>(
      'POSTMARK_WEBHOOK_USER',
    );
    const expectedPass = this.configService.get<string>(
      'POSTMARK_WEBHOOK_PASS',
    );

    if (!expectedUser || !expectedPass) {
      throw new Error(
        'Missing POSTMARK_WEBHOOK_USER/POSTMARK_WEBHOOK_PASS env vars',
      );
    }

    const ok =
      creds && creds.name === expectedUser && creds.pass === expectedPass;

    if (!ok) {
      // Important: triggers 401 + WWW-Authenticate so Basic Auth clients behave correctly
      throw new UnauthorizedException('Invalid webhook credentials');
    }

    next();
  }
}
