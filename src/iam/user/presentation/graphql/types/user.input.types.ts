import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  @IsNotEmpty({ message: 'username is required' })
  username: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;
}
