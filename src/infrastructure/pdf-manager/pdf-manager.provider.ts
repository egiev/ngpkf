import { Provider } from '@nestjs/common';
import { PdfManager } from '@core/abstracts';
import { PdfManagerService } from './pdf-manager.service';

export const pdfProvider: Provider[] = [
  { provide: PdfManager, useClass: PdfManagerService },
];
