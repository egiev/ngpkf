import { RequestContext } from '@mikro-orm/core';
import { InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AdminContext } from '@/admin/common/types';

export function createAuthAdmin({
  postgresEm,
  services: { loginWithCredentialsUseCase, configService },
}: AdminContext) {
  return {
    authenticate: async (email: string, password: string) => {
      try {
        return await RequestContext.create(postgresEm, async () => {
          const user = await loginWithCredentialsUseCase.authenticateUser(email, password);

          if (!user.getIsSuperUser() && !user.getIsStaff()) {
            throw new UnauthorizedException(
              'You are not authorized to access this resource. Please contact your administrator for assistance.',
            );
          }

          return {
            email: user.getUsername(),
            permissions: user.getAggregatedPermissions(),
            isSuperUser: user.getIsSuperUser(),
            isStaff: user.getIsStaff(),
          };
        });
      } catch (error) {
        if (error instanceof UnauthorizedException) {
          throw error;
        }

        throw new InternalServerErrorException(
          'An error occurred during authentication. Please contact your administrator.',
        );
      }
    },
    cookieName: configService.get<string>('ADMIN_COOKIE_NAME') as string,
    cookiePassword: configService.get<string>('ADMIN_COOKIE_PASSWORD') as string,
  };
}
