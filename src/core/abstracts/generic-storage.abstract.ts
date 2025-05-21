export abstract class FileStorage {
  abstract readonly storagePath: string;
  abstract upload(buffer: Buffer, filename: string): Promise<string>;
  abstract getFilePath(filename: string): Promise<string>;
  abstract isExists(filename: string): Promise<boolean>;
  abstract getFileExtension(mimetype: string): string;
}
