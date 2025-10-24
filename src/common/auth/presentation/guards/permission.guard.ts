import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { Observable } from 'rxjs';
import { JwtPayload } from '@/common/auth/domain/types/jwt-payload.type';
import {
  PERMISSION_OPTIONS_TOKEN,
  PermissionOptions,
} from '@/common/auth/infrastructure/types/permission-options.type';
import { IS_PUBLIC_KEY } from '@/common/auth/presentation/decorators/public.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    @Inject(Reflector) private readonly reflector: Reflector,
    @Inject(PERMISSION_OPTIONS_TOKEN) private readonly options: PermissionOptions,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPlublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPlublic) return true;

    const request = this.getRequest(context) as Request & { user: JwtPayload };
    const user = request.user;

    if (!user || !user.permissions || user.permissions.length === 0) {
      throw new UnauthorizedException('Authentication required or permissions data missing');
    }

    const requiredPermission = this.buildRequiredPermission(context);
    const hasPermission = user.permissions.includes(requiredPermission);

    if (!hasPermission) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    return true;
  }

  private getRequest(context: ExecutionContext) {
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest<Request>();
    }

    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext<{ req: Request }>().req;
  }

  private buildRequiredPermission(context: ExecutionContext): string {
    const handler = context.getHandler();
    const actionName = handler.name;
    const domainName = this.options.defaultDomain;

    // HTTP/Rest
    if (context.getType() === 'http') {
      const httpMethod = this.getRequest(context).method.toLowerCase();
      return `${domainName}.${httpMethod}.${actionName}`;
    }

    // GraphQL
    const ctx = GqlExecutionContext.create(context);
    const info = ctx.getInfo<GraphQLResolveInfo>();
    const gqlOperation = info.operation.operation.toLowerCase();
    return `${domainName}.${gqlOperation}.${actionName}`;
  }
}
