import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as yenv from 'yenv';

import { CoreModule } from './_core';
import { NotFoundFilter } from './_core/error';
import { ApplicationModule } from './app.module';

(async env => {
  const app = await NestFactory.create(ApplicationModule);

  const notFoundFilter = app.select(CoreModule).get(NotFoundFilter);

  app.useGlobalFilters(notFoundFilter);

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
