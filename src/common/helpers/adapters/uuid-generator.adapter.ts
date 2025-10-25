import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IdGeneratorPort } from '@/common/helpers/ports';

@Injectable()
export class UUIDGeneratorAdapter implements IdGeneratorPort {
  generate(): string {
    return uuidv4();
  }
}
