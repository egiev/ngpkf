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
    await fs.promises.writeFile(filepath, buffer, 'base64');
    return filename;
  }

  async getFilePath(filename: string): Promise<string> {
    return path.join(this.storagePath, filename);
  }

  async isExists(filename: string): Promise<boolean> {
    return await fs.existsSync(path.join(this.storagePath, filename));
  }
}
