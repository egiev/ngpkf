import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { LocalStorage } from '@core/abstracts';

@Injectable()
export class LocalStorageService implements LocalStorage {
  storagePath: string = path.join(process.cwd(), '/files');

  async upload(buffer: Buffer, filename: string): Promise<string> {
    const filepath = path.join(this.storagePath, filename);
    await fs.promises.mkdir(this.storagePath, { recursive: true });
    await fs.promises.writeFile(filepath, buffer);
    return filename;
  }

  async download(
    filename: string,
    token: string,
    response: any,
  ): Promise<void> {
    if (token !== 'valid-token') {
      response.status(400).send('Invalid or expired token');
      return;
    }

    const filePath = path.join(this.storagePath, filename);

    if (!fs.existsSync(filePath)) {
      response.status(404).send('File not found');
      return;
    }

    response.download(filePath, filename, (err) => {
      if (err) {
        response.status(500).send('Error downloading file');
      }
    });
  }
}
