import { Module } from '@nestjs/common';

import { CoreModule } from './_core';
import { AuthModule } from './auth';
import { UserModule } from './user';

@Module({
  imports: [AuthModule, CoreModule, UserModule],
})
export class ApplicationModule {}
