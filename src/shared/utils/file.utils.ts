import { v4 } from 'uuid';

export type DecodeBase64Pdf = {
  buffer: Buffer;
  filename: string;
};

export function decodeBase64Pdf(base64: string): DecodeBase64Pdf {
  const base64Data = base64.replace(/^data:application\/pdf;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  const filename = `${v4()}.pdf`;
  return { buffer, filename };
}
