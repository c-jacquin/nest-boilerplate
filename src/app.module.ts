import { Module } from '@nestjs/common';

import { AuthModule } from './auth';
import { CommonModule } from './common';
import { DatabaseModule } from './database';

@Module({
  imports: [AuthModule, CommonModule, DatabaseModule],
})
export class ApplicationModule {}
