import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@/common/decorators';
import { JwtAuthGuard, PermissionGuard, SuperUserGuard } from '@/common/guards';

@Injectable()
export class AppGuard implements CanActivate {
  constructor(
    @Inject(Reflector) private readonly reflector: Reflector,
    private readonly jwtAuthGuard: JwtAuthGuard,
    private readonly superUserGuard: SuperUserGuard,
    private readonly permissionGuard: PermissionGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPlublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPlublic) return true;

    await Promise.resolve(this.jwtAuthGuard.canActivate(context));

    const isSuperAdmin = await Promise.resolve(this.superUserGuard.canActivate(context));

    if (isSuperAdmin) {
      return true;
    }

    const hasPermission = await Promise.resolve(this.permissionGuard.canActivate(context));

    if (hasPermission) {
      return true;
    }

    return false;
  }
}
