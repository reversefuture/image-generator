import { Controller, Get, Query } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';
import { PythonService } from './python.service';
import axios from 'axios';
import * as fs from 'fs';
import * as https from 'https';

const agent = new https.Agent({
  rejectUnauthorized: false,  // Disable SSL verification
});

@Controller()
export class AppController {
  constructor(private readonly puppeteerService: PuppeteerService, private readonly pythonService: PythonService) {}
  
  @Get("hello")
  async hello(): Promise<string> {  
    return "Hello World!";
  }

  @Get('generate-image')
  async generateImage(@Query('url') url: string): Promise<string> {
    const imagePath = `./temp/screenshot-${Date.now()}.png`;
    await this.puppeteerService.generateImage(url, imagePath);
    return `Image saved to ${imagePath}`;
  }

  
  @Get('generate-image2')
  async generateImage2(@Query('url') url: string): Promise<string> {
    const imagePath = `./temp/screenshot-${Date.now()}.png`;
    let htmlContent: string;

    try {
      const response = await axios.get(url, {httpsAgent: agent});
      htmlContent = response.data;

      const tempFilePath = `./temp/temp-html-${Date.now()}.html`;
      fs.writeFileSync(tempFilePath, htmlContent, 'utf8');
      await this.pythonService.generateImage(tempFilePath, imagePath);
      const imageData = fs.readFileSync(imagePath, { encoding: 'base64' });
      return imageData;
    } catch (error) {
      console.error(`Error fetching HTML content from ${url}: ${error.message}`);
      throw new Error(`Failed to fetch HTML content from ${url}`);
    }
  }


}
