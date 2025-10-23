import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthCredentialsDTO {
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
