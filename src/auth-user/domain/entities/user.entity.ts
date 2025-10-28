import {
  GroupNameVO,
  GroupPermissionNameVO,
  HashedPasswordVO,
  PermissionNameVO,
  UserId,
  UsernameVO,
} from '@/auth-user/domain/value-objects';
import { BaseDomainEntity } from '@/common/ddd';

export type AuthUserPrimitives = {
  id: string;
  username: string;
  passwordHash: string;
  permissionNames: string[];
  groupNames: string[];
  groupPermissionNames: string[];
  isSuperUser: boolean;
  isStaff: boolean;
};

export type AuthUserCreationParams = {
  id: string;
  username: string;
  hashedPassword: string;
  permissionNames?: string[];
  groupNames?: string[];
  groupPermissionNames?: string[];
  isSuperUser?: boolean;
  isStaff?: boolean;
};

export class AuthUser implements BaseDomainEntity<AuthUserPrimitives> {
  constructor(
    private readonly id: UserId,
    private username: UsernameVO,
    private password: HashedPasswordVO,
    private permissionNames: PermissionNameVO[],
    private groupNames: GroupNameVO[],
    private groupPermissionNames: GroupPermissionNameVO[],
    private isSuperUser: boolean = false,
    private isStaff: boolean = false,
  ) {}

  public getId(): string {
    return this.id.value;
  }

  public getUsername(): string {
    return this.username.value;
  }

  public getPasswordHash(): string {
    return this.password.value;
  }

  public getIsSuperUser(): boolean {
    return this.isSuperUser;
  }

  public getIsStaff(): boolean {
    return this.isStaff;
  }

  public getAggregatedPermissions(): string[] {
    const permissions = this.permissionNames.map((vo) => vo.value);
    const groupPermissions = this.permissionNames.map((vo) => vo.value);
    const allPermissions = [...permissions, ...groupPermissions];
    return Array.from(new Set(allPermissions));
  }

  public setPermissions(newPermissions: PermissionNameVO[]): void {
    this.permissionNames = newPermissions;
  }

  static create(data: AuthUserCreationParams): AuthUser {
    const permissionNameVOs = (data.permissionNames ?? []).map((value) => PermissionNameVO.create(value));
    const groupNameVOs = (data.groupNames ?? []).map((value) => GroupNameVO.create(value));
    const groupPermissionNameVOs = (data.groupPermissionNames ?? []).map((value) =>
      GroupPermissionNameVO.create(value),
    );

    return new AuthUser(
      UserId.create(data.id),
      UsernameVO.create(data.username),
      HashedPasswordVO.create(data.hashedPassword),
      permissionNameVOs,
      groupNameVOs,
      groupPermissionNameVOs,
      data.isSuperUser ?? false,
    );
  }

  // Domain to Infrastructure(persistence)
  public toPrimitives(): AuthUserPrimitives {
    return {
      id: this.id.value,
      username: this.username.value,
      passwordHash: this.password.value,
      permissionNames: this.permissionNames.map((vo) => vo.value),
      groupNames: this.groupNames.map((vo) => vo.value),
      groupPermissionNames: this.groupPermissionNames.map((vo) => vo.value),
      isSuperUser: this.isSuperUser,
      isStaff: this.isStaff,
    };
  }

  // Infrastructure to Domain
  static fromPrimitives(data: AuthUserPrimitives): AuthUser {
    const permissionNameVOs = (data.permissionNames ?? []).map((value) => PermissionNameVO.create(value));
    const groupNamesVOs = (data.groupNames ?? []).map((value) => GroupNameVO.create(value));
    const groupPermissionnNameVOs = (data.groupPermissionNames ?? []).map((value) =>
      GroupPermissionNameVO.create(value),
    );

    return new AuthUser(
      UserId.fromPrimitives(data.id),
      UsernameVO.fromPrimitives(data.username),
      HashedPasswordVO.fromPrimitives(data.passwordHash),
      permissionNameVOs,
      groupNamesVOs,
      groupPermissionnNameVOs,
      data.isSuperUser,
      data.isStaff,
    );
  }
}
