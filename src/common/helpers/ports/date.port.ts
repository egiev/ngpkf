export abstract class DatePort {
  abstract format(date: Date | string, pattern: string): string;
}
