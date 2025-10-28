import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { unlink, writeFile } from 'fs/promises';
import { join } from 'path';
import { StoragePort } from '@/common/helpers/ports';

type FileFolder = 'tmp' | 'files';

@Injectable()
export class LocalStorageAdapter implements StoragePort {
  private ensureDirectoryExists(dirPath: string) {
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true });
    }
  }

  async upload(filename: string, buffer: Buffer, targetDir: FileFolder = 'files'): Promise<string> {
    const fullFolderPath = join(process.cwd(), targetDir);
    this.ensureDirectoryExists(fullFolderPath);

    const filePath = join(fullFolderPath, filename);

    try {
      await writeFile(filePath, buffer, 'base64');
      return filename;
    } catch {
      throw new InternalServerErrorException('Failed to save file');
    }
  }

  async remove(filePath: string): Promise<void> {
    try {
      await unlink(filePath);
    } catch {
      throw new InternalServerErrorException('Failed to delete file');
    }
  }

  getFilePath(filename: string, targetDir: FileFolder = 'files'): string {
    return join(process.cwd(), targetDir, filename);
  }

  isExists(filename: string, targetDir: FileFolder = 'files'): boolean {
    return existsSync(join(process.cwd(), targetDir, filename));
  }
}
