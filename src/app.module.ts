import { Module } from '@nestjs/common';

import { AuthModule } from './auth';
import { CommonModule } from './common';
import { UserModule } from './user';

@Module({
  imports: [AuthModule, CommonModule, UserModule],
})
export class ApplicationModule {}
