import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class VerifyOTPDto {
  @Field()
  @IsNotEmpty()
  mrn!: string;

  @Field()
  @IsNotEmpty()
  otp!: string;
}
