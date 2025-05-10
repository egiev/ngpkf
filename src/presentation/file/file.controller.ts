import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { DownloadFileCase } from '@application/use-cases';

@Controller('files')
export class FileController {
  constructor(private readonly downloadFileCase: DownloadFileCase) {}

  @Get(':filename')
  async downloadFile(
    @Param('filename') filename: string,
    @Query('token') token: string,
    @Res() res: Response,
  ) {
    await this.downloadFileCase.execute({ filename, token, res });
  }
}
