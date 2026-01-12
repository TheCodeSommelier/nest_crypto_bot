import { Injectable } from '@nestjs/common';
import { UserWhereUniqueInput } from 'src/generated/prisma/models';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async user(where: UserWhereUniqueInput) {
    return await this.prisma.user.findFirstOrThrow({ where });
  }

  async users() {
    return await this.prisma.user.findMany();
  }
}
