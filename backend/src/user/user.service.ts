import { HttpException, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserMapper } from './mappers/user.mapper';
import { HttpStatusCode } from 'axios';

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
        accountProvider: user.accountProvider,
      },
    });

    return this.userMapper.toDto(createdUser);
  }

  async substractTokens(id: string, tokens: number): Promise<UserDto> {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      throw new HttpException(
        `user with id ${id} was not found`,
        HttpStatusCode.NotFound,
      );
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: {
        tokensLeft: {
          decrement: tokens,
        },
      },
    });

    return this.userMapper.toDto(updatedUser);
  }
}
