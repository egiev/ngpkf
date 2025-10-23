import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { PermissionRepositoryPort } from '@/iam/permission/domain/ports';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsPermissionExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly permissionRepository: PermissionRepositoryPort) {}

  async validate(permissions: string[], _args: ValidationArguments) {
    const results = await this.permissionRepository.existsByNames(permissions);
    return results.every((exists) => exists === true);
  }

  defaultMessage(args: ValidationArguments): string {
    return `Some permissions in ${args.property} do not exist in the database`;
  }
}
