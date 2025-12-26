import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpStatusCode } from 'axios';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid token');
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload: { sub: string } = this.jwtService.verify(token);

      const user = await this.userService.getUserById(payload.sub);

      if (!user) {
        throw new HttpException(
          `user with id ${payload.sub} was not found`,
          HttpStatusCode.NotFound,
        );
      }

      // @ts-expect-error i dont want to type typescript here
      req.user = user;

      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
