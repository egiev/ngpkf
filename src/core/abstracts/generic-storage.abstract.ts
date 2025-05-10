export abstract class FileStorage {
  abstract storagePath: string;
  abstract upload(buffer: Buffer, filename: string): Promise<any>;
  abstract download(
    filename: string,
    token: string,
    response: any,
  ): Promise<void>;
}
