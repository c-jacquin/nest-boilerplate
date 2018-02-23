import { NestFactory } from '@nestjs/core';
import * as yenv from 'yenv';

import { ApplicationModule } from './app.module';

(async () => {
  const env = yenv();
  const app = await NestFactory.create(ApplicationModule);
  await app.listen(env.PORT);
})();
