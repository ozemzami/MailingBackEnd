import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const requestIp = require('request-ip');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.use(requestIp.mw());
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Mail helper application')
    .setDescription(
      'this application help mailer to execute his jobs like redirection etc...',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger-api', app, document);

  app.enableCors();
  await app.listen(80);
}
bootstrap();
