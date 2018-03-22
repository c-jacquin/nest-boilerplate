import { Module } from '@nestjs/common';

import { AdminModule } from './admin';
import { AuthModule } from './auth';
import { CommonModule } from './common';
import { DatabaseModule } from './database';

@Module({
  imports: [AdminModule, AuthModule, CommonModule, DatabaseModule],
})
export class ApplicationModule {}
