export abstract class StoragePort {
  abstract upload(filename: string, buffer: Buffer, targetDir?: string): Promise<string>;
  abstract remove(filepath: string): Promise<void>;
  abstract getFilePath(filename: string, targetDir?: string): string;
  abstract isExists(filename: string, targetDir?: string): boolean;
}
