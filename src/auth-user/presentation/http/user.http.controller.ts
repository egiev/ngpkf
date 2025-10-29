import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserUseCase, GetUsersUseCase, UpdateUserPermissionsUseCase } from '@/auth-user/application';
import { CreateUserDto, UpdatePermissionsDto } from '@/auth-user/presentation/http/dtos';
import { UserSerialization } from '@/auth-user/presentation/user.serialization';
import { Response } from '@/common/response/decorators';

@ApiTags('Users')
@ApiBearerAuth('accessToken')
@Controller({ path: 'users' })
export class AuthUserHttpController {
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
