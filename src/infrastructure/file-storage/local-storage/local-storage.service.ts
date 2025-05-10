import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { LocalStorage } from '@core/abstracts';

@Injectable()
export class LocalStorageService implements LocalStorage {
  storagePath: string = path.join(process.cwd(), '/file');

  async upload(buffer: Buffer, filename: string): Promise<any> {
    const filepath = path.join(this.storagePath, filename);
    await fs.promises.mkdir(this.storagePath, { recursive: true });
    await fs.promises.writeFile(filepath, buffer);
    return filename;
  }
}
