import { Controller, Get, Query } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';

@Controller()
export class AppController {
  constructor(private readonly puppeteerService: PuppeteerService) {}

  @Get('generate-image')
  async generateImage(@Query('url') url: string): Promise<string> {
    const imagePath = `./images/screenshot-${Date.now()}.png`;
    await this.puppeteerService.generateImage(url, imagePath);
    return `Image saved to ${imagePath}`;
  }
}
