export abstract class FileStorage {
  abstract storagePath: string;
  abstract upload(buffer: Buffer, filename: string): Promise<any>;
}
