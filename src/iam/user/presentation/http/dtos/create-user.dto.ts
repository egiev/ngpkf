import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty({ message: 'username is required' })
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
