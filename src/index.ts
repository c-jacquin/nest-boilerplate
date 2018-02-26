import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import {
  BadRequestFilter,
  Env,
  ExceptionModule,
  NotFoundFilter,
} from './_core';
import { ApplicationModule } from './app.module';

(async env => {
  const app = await NestFactory.create(ApplicationModule);
  const exceptionModule = app.select(ExceptionModule);

  app.useGlobalFilters(
    exceptionModule.get(BadRequestFilter),
    exceptionModule.get(NotFoundFilter),
  );

  const options = new DocumentBuilder()
    .setTitle('Nest Boilerplate')
    .setDescription('The nest boilerplate API')
    .setVersion('1.0')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(env.PORT);
})(new Env());
