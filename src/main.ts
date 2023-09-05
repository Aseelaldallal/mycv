import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// Cookie session has a couple of settings that dont work nicely
// with our tsconfig file so we need to import it like this
const cookieSession = require('cookie-session');
// config mismatch between our nest project and cookie session

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ['seriesofrandomnumbers'] // used to encrypt info inside cookie
  }))
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  await app.listen(3000);
}
bootstrap();
