import { Module } from '@nestjs/common';
import { IdeasGeneratorModule } from './ideasGenerator/ideasGenerator.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    IdeasGeneratorModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
