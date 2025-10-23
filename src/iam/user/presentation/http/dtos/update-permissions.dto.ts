import { IsNotEmpty, IsString } from 'class-validator';
import { IsPermissionExists } from '@/common/validation/decorators';

export class UpdatePermissionsDto {
  @IsString({ each: true })
  @IsNotEmpty({ each: true, message: 'Permission name should not be empty' })
  @IsPermissionExists({ message: 'One or more permissions do not exist' })
  newPermissions: string[];
}
