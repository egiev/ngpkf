import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsPermissionExistsConstraint } from '@/common/validation/rules';

export function IsPermissionExists(validationOptions: ValidationOptions) {
  return (object: object, propertyName: string) =>
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsPermissionExistsConstraint,
    });
}
