import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class ContactDto {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  homephone?: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  mobilephone?: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  alternatephone?: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  emailid?: string;
}
