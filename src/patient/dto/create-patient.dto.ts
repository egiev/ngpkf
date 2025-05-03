import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreatePatientDto {
  @Field()
  @IsNotEmpty()
  mrn!: string;
}
