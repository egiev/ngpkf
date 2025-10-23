import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Response } from '@/common/response/decorators';
import { CreateUserUseCase, GetUsersUseCase, UpdateUserPermissionsUseCase } from '@/iam/user/application';
import { CreateUserDto, UpdatePermissionsDto } from '@/iam/user/presentation/http/dtos';
import { UserSerialization } from '@/iam/user/presentation/user.serialization';

@Controller({ path: 'users' })
export class UserHttpController {
  constructor(
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserPermissionsUseCase: UpdateUserPermissionsUseCase,
  ) {}

  @Get()
  @Response({ serialization: UserSerialization })
  users() {
    return this.getUsersUseCase.execute();
  }

  @Post()
  @Response({ serialization: UserSerialization })
  async user(@Body() dto: CreateUserDto) {
    return await this.createUserUseCase.execute(dto);
  }

  @Put(':id/permissions')
  @Response({ serialization: UserSerialization })
  async updatePermissions(@Param('id') id: string, @Body() dto: UpdatePermissionsDto) {
    return await this.updateUserPermissionsUseCase.execute({ id, newPermissions: dto.newPermissions });
  }
}
