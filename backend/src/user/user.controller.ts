import {
  Controller,
  Get,
  HttpException,
  Param,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/JwtToken.guard';
import type { RequestWithUser } from './types/RequestWithUser';
import { UserService } from './user.service';
import { UserMapper } from './mappers/user.mapper';
import { HttpStatusCode } from 'axios';

@Controller('/api/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userMapper: UserMapper,
  ) {}

  @Get(':id')
  @UseGuards(JwtGuard)
  async getUserInfoById(@Param('id') id: string, @Req() req: RequestWithUser) {
    if (req.user.id !== id) {
      throw new UnauthorizedException(
        'you cannot get info about user with a different id',
      );
    }

    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new HttpException(
        `user with id ${id} was not found`,
        HttpStatusCode.NotFound,
      );
    }

    return this.userMapper.toUserModel(user);
  }
}
