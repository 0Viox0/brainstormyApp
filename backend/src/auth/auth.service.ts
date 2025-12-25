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

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private configService: ConfigService) {}

  public async loginWithYandex(code: string): Promise<LoginModel> {
    const yandexClientId = this.configService.get<string>('YANDEX_CLIENT_ID');
    const yandexClientSecret = this.configService.get<string>(
      'YANDEX_CLIENT_SECRET',
    );

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
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    const { access_token } = tokenResponse.data as { access_token: string };

    if (!access_token) {
      throw new UnauthorizedException('Invalid Yandex code');
    }

    const userResponse = await axios.get('https://login.yandex.ru/info', {
      headers: {
        Authorization: `OAuth ${access_token}`,
      },
    });

    const yandexUser = userResponse.data as YandexUserResponseDto;

    console.log(yandexUser);

    return {
      user: {
        tokensLeft: 0,
        userLogoUrl: 'skdjf',
        username: 'lskdfj',
      },
      jwtToken: '-',
    };
  }
}
