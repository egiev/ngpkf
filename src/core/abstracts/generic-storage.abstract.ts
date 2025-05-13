export abstract class FileStorage {
  abstract storagePath: string;
  abstract upload(buffer: Buffer, filename: string): Promise<any>;
  abstract getFilePath(filename: string): Promise<string>;
  abstract isExists(filename: string): Promise<boolean>;
}
