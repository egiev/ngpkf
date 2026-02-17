import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthCredentialsDTO {
  @ApiProperty()
  @IsEmail({}, { message: 'Enter a valid email address' })
  @IsNotEmpty({ message: 'This field is required' })
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'This field is required' })
  password: string;
}
