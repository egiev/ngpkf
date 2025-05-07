import { Field, InputType } from '@nestjs/graphql';
import { IsBase64, IsNotEmpty } from 'class-validator';

@InputType()
export class ResultDto {
  @Field()
  @IsNotEmpty()
  @IsBase64()
  base64!: string;
}
