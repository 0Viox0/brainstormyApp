import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { LoginModel } from './models/login.model';
import { YandexUserResponseDto } from './dtos/yandexUserResponse.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserMapper } from 'src/user/mappers/user.mapper';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly userMapper: UserMapper,
  ) {}

  public async loginWithYandex(code: string): Promise<LoginModel> {
    const yandexClientId = this.configService.get<string>('YANDEX_CLIENT_ID');
    const yandexClientSecret = this.configService.get<string>(
      'YANDEX_CLIENT_SECRET',
    );
    const newUserMaxTokensRaw = this.configService.get<string>(
      'NEW_USER_MAX_TOKENS',
    );

    if (!newUserMaxTokensRaw) {
      throw new HttpException(
        'newUserMaxTokens variable was not set',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const newUserMaxTokens = parseInt(newUserMaxTokensRaw);

    if (!yandexClientId) {
      throw new HttpException(
        'yandexClientId variable was not set',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!yandexClientSecret) {
      throw new HttpException(
        'yandexClientSecret variable was not set',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const tokenResponse = await axios.post(
      'https://oauth.yandex.ru/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: yandexClientId,
        client_secret: yandexClientSecret,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );

    const { access_token } = tokenResponse.data as { access_token: string };

    if (!access_token) {
      throw new UnauthorizedException('Invalid Yandex code');
    }

    const userResponse = await axios.get('https://login.yandex.ru/info', {
      headers: { Authorization: `OAuth ${access_token}` },
    });

    const yandexUser = userResponse.data as YandexUserResponseDto;

    let user = await this.userService.getUserById(yandexUser.id);

    if (!user) {
      user = await this.userService.createUser({
        id: yandexUser.id,
        username: yandexUser.display_name,
        userLogoUrl: `https://avatars.yandex.net/get-yapic/${yandexUser.default_avatar_id}`,
        tokensLeft: newUserMaxTokens,
      });
    }

    const jwtToken = this.jwtService.sign({ sub: user.id });

    return {
      user: this.userMapper.toUserModel(user),
      jwtToken: jwtToken,
    };
  }
}
