import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dns from 'node:dns';

dns.setDefaultResultOrder('ipv4first');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
