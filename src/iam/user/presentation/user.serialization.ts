import { Expose } from 'class-transformer';

export class UserSerialization {
  @Expose()
  id!: string;

  @Expose()
  username!: string;

  @Expose()
  isSuperUser!: boolean;

  @Expose({ toClassOnly: true })
  permissionNames!: string[];

  @Expose({ toClassOnly: true })
  groupPermissionNames!: string[];

  @Expose()
  get permissions(): string[] {
    const permissions = new Set<string>([...this.permissionNames, ...this.groupPermissionNames]);
    return Array.from(permissions);
  }
}
