import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { AuthPermissionRepositoryPort } from '@/auth-user/domain/ports';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsPermissionExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly authPermissionRepository: AuthPermissionRepositoryPort) {}

  async validate(permissions: string[], _args: ValidationArguments) {
    const results = await this.authPermissionRepository.existsByNames(permissions);
    return results.every((exists) => exists === true);
  }

  defaultMessage(args: ValidationArguments): string {
    return `Some permissions in ${args.property} do not exist in the database`;
  }
}
