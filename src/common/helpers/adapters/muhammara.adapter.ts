/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { Recipe } from 'muhammara';
import { v4 } from 'uuid';
import { DecodeBase64Pdf, PdfPort } from '@/common/helpers/ports';

@Injectable()
export class MuhammaraAdapter implements PdfPort {
  decodeBase64Pdf(base64: string): DecodeBase64Pdf {
    const base64Data = base64.replace(/^data:application\/pdf;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    // TODO: decouple this file
    const filename = `${v4()}`;
    return { buffer, filename };
  }

  encryptPdf(input: string, output: string, password: string): void {
    const pdfDoc = new Recipe(input, output);

    pdfDoc
      .encrypt({
        userPassword: password,
        ownerPassword: password,
        userProtectionFlag: 4,
      })
      .endPDF();
  }
}
