import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  private readonly fileStoragePath = path.join(process.cwd(), 'files');

  async download(filename: string, token: string, res: Response) {
    if (token !== 'valid-token') {
      res.status(400).send('Invalid or expired token');
      return;
    }

    // Construct the full path to the file
    const filePath = path.join(this.fileStoragePath, filename);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      res.status(404).send('File not found');
      return;
    }

    // Send the file as a response
    res.download(filePath, filename, (err) => {
      if (err) {
        res.status(500).send('Error downloading file');
      }
    });
  }
}
