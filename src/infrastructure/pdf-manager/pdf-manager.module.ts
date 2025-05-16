import { Module } from '@nestjs/common';
import { pdfProvider } from './pdf-manager.provider';

@Module({ providers: [...pdfProvider], exports: [...pdfProvider] })
export class PdfManagerModule {}
