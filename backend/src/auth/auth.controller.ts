import { Body, Controller, Post } from '@nestjs/common';
import { YandexKeyModel } from './models/yandexKey.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('yandex')
  public getYandexInfo(@Body() yandexKey: YandexKeyModel) {
    return this.authService.loginWithYandex(yandexKey.code);
  }
}
