import { UserEntity } from '@/modules/user/core/entities';

export function extractPermissions(user: UserEntity): string[] {
  const permissions = new Set<string>();

  user.permissions?.getItems().forEach((up) => {
    if (up.permission.name) {
      permissions.add(up.permission.name);
    }
  });

  user.groups?.getItems().forEach((item) => {
    item.group.permissions?.getItems().forEach((gp) => {
      if (gp.permission.name) {
        permissions.add(gp.permission.name);
      }
    });
  });

  return [...permissions];
}
