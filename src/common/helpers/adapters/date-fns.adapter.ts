import { Injectable } from '@nestjs/common';
import { format } from 'date-fns-tz';
import { DatePort } from '@/common/helpers/ports';

@Injectable()
export class DateFnsAdapter implements DatePort {
  format(date: Date | string, pattern: string): string {
    return format(date, pattern);
  }
}
