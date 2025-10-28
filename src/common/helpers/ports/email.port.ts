type Email = { from: string; to: string; subject: string; html: string };

export abstract class EmailPort {
  abstract send(email: Email): Promise<void>;
}
