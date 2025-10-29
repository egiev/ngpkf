import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty({ message: 'username is required' })
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
