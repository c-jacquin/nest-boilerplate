import { Module } from '@nestjs/common';

import { CoreModule } from './_core';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  imports: [CoreModule],
})
export class ApplicationModule {}
