import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AppStatsService {
  constructor(private readonly prismaService: PrismaService) {}

  public incTotalYandexRegisteredUsers() {}
  public incTotalGoogleRegisteredUsers() {}
  public incGeneratorUses() {}
  public incScamperUses() {}
  public incSixHatsUses() {}
}
