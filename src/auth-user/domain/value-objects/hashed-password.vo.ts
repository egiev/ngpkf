import { BaseVO } from '@/common/ddd';

export class HashedPasswordVO extends BaseVO<string> {
  protected ensureInvariants(): void {
    if (!this.value) {
      throw new Error('Password cannot be empty');
    }
  }
}
