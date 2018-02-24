import { Module } from '@nestjs/common';

import { CoreModule } from './_core';
import { AuthModule } from './auth';

@Module({
  imports: [AuthModule, CoreModule],
})
export class ApplicationModule {}
