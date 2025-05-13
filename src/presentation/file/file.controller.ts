import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { DownloadResultUserCase } from '@application/use-cases';

@Controller('files')
export class FileController {
  constructor(
    private readonly downloadResultUserCase: DownloadResultUserCase,
  ) {}

  @Get(':filename')
  async downloadFile(
    @Param('filename') filename: string,
    @Query('token') token: string,
    @Res() res: Response,
  ) {
    try {
      const filepath = await this.downloadResultUserCase.execute({
        filename,
        token,
      });
      res.download(filepath);
    } catch (error) {
      res.send(error);
    }
  }
}
