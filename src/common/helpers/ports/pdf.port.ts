export type DecodeBase64Pdf = {
  buffer: Buffer;
  filename: string;
};

export abstract class PdfPort {
  abstract decodeBase64Pdf(base64: string): DecodeBase64Pdf;
  abstract encryptPdf(input: string, output: string, password: string): void;
}
