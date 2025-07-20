import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //애초에 정의된 dto property만 들어가게된다.
      forbidNonWhitelisted: true, // 존재하는 값이 없으면 에러forbid 금지
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
