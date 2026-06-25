import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cài đặt Cookie (Yêu cầu 1)
  // Bạn có thể truyền vào một chuỗi secret để ký cookie nếu cần
  app.use(cookieParser('my-super-secret-cookie'));

  // Cài đặt Session (Yêu cầu 2)
  app.use(
    session({
      secret: 'my-super-secret-session',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 }, // Session tồn tại 1 giờ
    }),
  );

  await app.listen(3000);
}
bootstrap();