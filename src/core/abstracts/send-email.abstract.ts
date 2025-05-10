export abstract class SendEmail {
  abstract send(options: any): Promise<any>;
}
