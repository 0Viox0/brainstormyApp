import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserMapper } from './mappers/user.mapper';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userMapper: UserMapper,
  ) {}

  async getUserById(id: string): Promise<UserDto | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return this.userMapper.toDto(user);
  }

  async createUser(user: UserDto): Promise<UserDto> {
    const createdUser = await this.prismaService.user.create({
      data: {
        id: user.id,
        name: user.username,
        profilePictureUrl: user.userLogoUrl,
        tokensLeft: user.tokensLeft,
      },
    });

    return this.userMapper.toDto(createdUser);
  }
}
