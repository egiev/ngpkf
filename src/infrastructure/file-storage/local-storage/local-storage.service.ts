import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { LocalStorage } from '@core/abstracts';

@Injectable()
export class LocalStorageService implements LocalStorage {
  readonly storagePath: string = path.join(process.cwd(), '/files');

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

  getFileExtension(mimetype: string): string {
    const map: Record<string, string> = {
      'application/pdf': 'pdf',
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'application/msword': 'doc',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        'docx',
      'application/vnd.ms-excel': 'xls',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        'xlsx',
      'text/plain': 'txt',
      'text/csv': 'csv',
    };

    return map[mimetype] || '';
  }
}
