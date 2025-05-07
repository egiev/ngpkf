import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { FileService } from './file.service';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get(':filename')
  async downloadFile(
    @Param('filename') filename: string,
    @Query('token') token: string,
    @Res() res: Response,
  ) {
    this.fileService.download(filename, token, res);
  }
}
