import { BaseVO } from '@/common/ddd';

export class UserId extends BaseVO<string> {
  private static readonly UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  protected ensureInvariants(): void {
    if (!this.value || !UserId.UUID_REGEX.test(this.value)) {
      throw new Error(`Invalid UserId format: ${this.value}. Must be a valid UUID.`);
    }
  }
}
