import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import {
  BadRequestFilter,
  DatabaseFilter,
  DatabaseModule,
  Env,
  ExceptionModule,
  InternalErrorFilter,
  LoggerModule,
  NotFoundFilter,
} from './_core';
import { ApplicationModule } from './app.module';

(async env => {
  const app = await NestFactory.create(ApplicationModule);
  const exceptionModule = app.select(ExceptionModule);
  const databaseModule = app.select(DatabaseModule);

  app.useGlobalFilters(
    exceptionModule.get(BadRequestFilter),
    exceptionModule.get(InternalErrorFilter),
    exceptionModule.get(NotFoundFilter),
    databaseModule.get(DatabaseFilter),
  );

  const options = new DocumentBuilder()
    .setTitle('Nest Boilerplate')
    .setDescription('The nest boilerplate API')
    .setVersion('1.0')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(env.PORT);
})(new Env());
