import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ApplicationModule } from './app.module';
import {
  BadRequestFilter,
  CommonModule,
  Env,
  InternalErrorFilter,
  NotFoundFilter,
} from './common';
import { DatabaseFilter, DatabaseModule } from './database';

(async env => {
  const app = await NestFactory.create(ApplicationModule);
  const commonModule = app.select(CommonModule);
  const databaseModule = app.select(DatabaseModule);

  app.useGlobalFilters(
    commonModule.get(BadRequestFilter),
    commonModule.get(InternalErrorFilter),
    commonModule.get(NotFoundFilter),
    databaseModule.get(DatabaseFilter),
  );

  const options = new DocumentBuilder()
    .setTitle('Nest Boilerplate')
    .setDescription('The nest boilerplate API')
    .setVersion('1.0')
    .addTag('auth')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(env.PORT);
})(new Env());
