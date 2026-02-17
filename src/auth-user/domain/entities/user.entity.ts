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

export class AuthUser {
  constructor(
    private readonly id: string,
    private readonly username: string,
    private readonly passwordHash: string,
    private permissionNames: string[] = [],
    private groupNames: string[] = [],
    private groupPermissionNames: string[] = [],
    private isSuperUser: boolean = false,
    private isStaff: boolean = false,
  ) {}

  public getId(): string {
    return this.id;
  }

  public getUsername(): string {
    return this.username;
  }

  public getPasswordHash(): string {
    return this.passwordHash;
  }

  public getIsSuperUser(): boolean {
    return this.isSuperUser;
  }

  public getIsStaff(): boolean {
    return this.isStaff;
  }

  getAggregatedPermissions(): string[] {
    const allPermissions = [...this.permissionNames, ...this.groupPermissionNames];

    return Array.from(new Set(allPermissions));
  }

  setPermissions(permissions: string[]): void {
    this.permissionNames = permissions;
  }

  static create(data: AuthUserCreationParams): AuthUser {
    return new AuthUser(
      data.id,
      data.username,
      data.hashedPassword,
      data.permissionNames ?? [],
      data.groupNames ?? [],
      data.groupPermissionNames ?? [],
      data.isSuperUser ?? false,
    );
  }

  // Domain to Infrastructure(persistence)
  public toPrimitives(): AuthUserPrimitives {
    return {
      id: this.id,
      username: this.username,
      passwordHash: this.passwordHash,
      permissionNames: this.permissionNames,
      groupNames: this.groupNames,
      groupPermissionNames: this.groupPermissionNames,
      isSuperUser: this.isSuperUser,
      isStaff: this.isStaff,
    };
  }

  // Infrastructure to Domain
  static fromPrimitives(data: AuthUserPrimitives): AuthUser {
    return new AuthUser(
      data.id,
      data.username,
      data.passwordHash,
      data.permissionNames,
      data.groupNames,
      data.groupPermissionNames,
      data.isSuperUser,
      data.isStaff,
    );
  }
}
