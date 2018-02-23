import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  components: [],
  controllers: [AppController],
  imports: [],
})
export class ApplicationModule {}
