import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { PdfManager } from '@core/abstracts';
import { DecodeBase64Pdf } from '@core/types';

@Injectable()
export class PdfManagerService implements PdfManager {
  decodeBase64Pdf(base64: string): DecodeBase64Pdf {
    const base64Data = base64.replace(/^data:application\/pdf;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    // TODO: decouple this file
    const filename = `${v4()}.pdf`;
    return { buffer, filename };
  }
}
