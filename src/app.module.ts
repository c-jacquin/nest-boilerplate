import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { CoreModule } from './core/core.module';

@Module({
  components: [],
  controllers: [AppController],
  imports: [CoreModule],
})
export class ApplicationModule {}
