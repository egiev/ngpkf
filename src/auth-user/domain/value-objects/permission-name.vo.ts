import { BaseVO } from '@/common/ddd';

export class PermissionNameVO extends BaseVO<string> {
  protected ensureInvariants(): void {
    if (!this.value) {
      throw new Error('Permission name cannot be empty');
    }
  }
}
