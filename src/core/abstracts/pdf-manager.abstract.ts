import { DecodeBase64Pdf } from '../types/';

export abstract class PdfManager {
  abstract decodeBase64Pdf(base64: string): DecodeBase64Pdf;
}
