import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, '0.0.0.0'); // Listen on all interfaces, 127.0.0.1 is the loopback address only work in local
}
bootstrap();
