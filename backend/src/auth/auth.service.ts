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
import { GoogleUserResponseDto } from './dtos/googleUserRespose.dto';
import { AppStatsService } from 'src/appStats/appStats.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly userMapper: UserMapper,
    private readonly appStats: AppStatsService,
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
        'NEW_USER_MAX_TOKENS variable was not set',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const newUserMaxTokens = parseInt(newUserMaxTokensRaw);

    if (!yandexClientId) {
      throw new HttpException(
        'YANDEX_CLIENT_ID variable was not set',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!yandexClientSecret) {
      throw new HttpException(
        'YANDEX_CLIENT_SECRET variable was not set',
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
    let isNewUser = false;

    if (!user) {
      user = await this.userService.createUser({
        id: yandexUser.id,
        username: yandexUser.display_name,
        userLogoUrl: `https://avatars.yandex.net/get-yapic/${yandexUser.default_avatar_id}`,
        tokensLeft: newUserMaxTokens,
        accountProvider: 'yandex',
      });
      isNewUser = true;
      await this.appStats.incTotalYandexRegisteredUsers();
    } else {
      user = await this.userService.updateUser(yandexUser.id, {
        username: yandexUser.display_name,
        userLogoUrl: `https://avatars.yandex.net/get-yapic/${yandexUser.default_avatar_id}`,
      });
    }

    const jwtToken = this.jwtService.sign({ sub: user.id });

    return {
      user: this.userMapper.toUserModel(user, isNewUser),
      jwtToken: jwtToken,
    };
  }

  public async loginWithGoogle(code: string): Promise<LoginModel> {
    const googleClientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    const googleClientSecret = this.configService.get<string>(
      'GOOGLE_CLIENT_SECRET',
    );
    const newUserMaxTokensRaw = this.configService.get<string>(
      'NEW_USER_MAX_TOKENS',
    );

    if (!newUserMaxTokensRaw) {
      throw new HttpException(
        'NEW_USER_MAX_TOKENS variable was not set',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const newUserMaxTokens = parseInt(newUserMaxTokensRaw);

    if (!googleClientId) {
      throw new HttpException(
        'GOOGLE_CLIENT_ID variable was not set',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!googleClientSecret) {
      throw new HttpException(
        'GOOGLE_CLIENT_SECRET variable was not set',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const tokenResponse = await axios.post(
      'https://oauth2.googleapis.com/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: googleClientId,
        client_secret: googleClientSecret,
        redirect_uri: this.configService.get<string>(
          'GOOGLE_REDIRECT_URI',
          `${this.configService.get('FRONTEND_URL')}/auth/google`,
        ),
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );

    const { access_token, id_token } = tokenResponse.data as {
      access_token: string;
      id_token: string;
    };

    if (!access_token || !id_token) {
      throw new UnauthorizedException('Invalid Google authorization code');
    }

    const userInfoResponse = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: { Authorization: `Bearer ${access_token}` },
      },
    );

    const googleUser = userInfoResponse.data as GoogleUserResponseDto;

    let user = await this.userService.getUserById(googleUser.sub);
    let isNewUser = false;

    if (!user) {
      user = await this.userService.createUser({
        id: googleUser.sub,
        username: googleUser.name,
        userLogoUrl: googleUser.picture,
        tokensLeft: newUserMaxTokens,
        accountProvider: 'google',
      });
      isNewUser = true;
      await this.appStats.incTotalGoogleRegisteredUsers();
    } else {
      user = await this.userService.updateUser(googleUser.sub, {
        username: googleUser.name,
        userLogoUrl: googleUser.picture,
      });
    }

    const jwtToken = this.jwtService.sign({ sub: user.id });

    return {
      user: this.userMapper.toUserModel(user, isNewUser),
      jwtToken: jwtToken,
    };
  }
}
