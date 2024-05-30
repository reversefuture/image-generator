import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class PythonService {
  async generateImage(htmlFilePath: string, imagePath: string): Promise<void> {
    const command = `python generate_image.py "${htmlFilePath}" "${imagePath}"`;

    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing Python script: ${error.message}`);
          reject(new HttpException(`Python script error: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR));
          return;
        }
        if (stderr) {
          console.error(`Python script stderr: ${stderr}`);
          reject(new HttpException(`Python script stderr: ${stderr}`, HttpStatus.INTERNAL_SERVER_ERROR));
          return;
        }
        console.log(`Python script stdout: ${stdout}`);
        resolve();
      });
    });
  }
}
