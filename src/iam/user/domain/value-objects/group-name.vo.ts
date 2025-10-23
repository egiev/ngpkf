import { BaseVO } from '@/common/ddd';

export class GroupNameVO extends BaseVO<string> {
  protected ensureInvariants(): void {
    if (!this.value) {
      throw new Error('Group name cannot be empty');
    }
  }
}
