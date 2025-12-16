import { Module } from '@nestjs/common';
import { IdeasGeneratorModule } from './ideasGenerator/ideasGenerator.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    IdeasGeneratorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
