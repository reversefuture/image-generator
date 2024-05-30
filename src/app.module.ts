import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PuppeteerService } from './puppeteer.service';
import { PythonService } from './python.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PuppeteerService, PythonService],
})
export class AppModule {}
