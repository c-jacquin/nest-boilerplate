import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as yenv from 'yenv';

import { CoreModule } from './_core';
import { BadRequestFilter, NotFoundFilter } from './_core/error';
import { ApplicationModule } from './app.module';

(async env => {
  const app = await NestFactory.create(ApplicationModule);
  const coreModule = app.select(CoreModule);

  app.useGlobalFilters(
    coreModule.get(BadRequestFilter),
    coreModule.get(NotFoundFilter),
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
})(yenv());
