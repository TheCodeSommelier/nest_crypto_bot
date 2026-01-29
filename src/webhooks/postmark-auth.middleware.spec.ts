import { ConfigService } from '@nestjs/config';
import { PostmarkAuthMiddleware } from './postmark-auth.middleware';

describe('PostmarkAuthMiddleware', () => {
  it('should be defined', () => {
    expect(new PostmarkAuthMiddleware(new ConfigService())).toBeDefined();
  });
});
