import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { ContactDto } from './contact.dto';

@InputType()
export class CreatePatientDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  mrn!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @Field(() => ContactDto)
  @IsObject()
  contact!: ContactDto;
}
