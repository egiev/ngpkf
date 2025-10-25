import { BaseVO } from '@/common/ddd';

export class GroupPermissionNameVO extends BaseVO<string> {
  protected ensureInvariants(): void {
    if (!this.value) {
      throw new Error('Group permission name cannot be empty');
    }
  }
}
