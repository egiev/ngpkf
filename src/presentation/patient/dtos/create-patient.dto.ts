import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ContactDto } from './contact.dto';
import { ResultDto } from './result.dto';

@InputType()
export class CreatePatientDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  mrn: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @Field(() => ContactDto)
  @IsObject()
  contact: ContactDto;

  @Field(() => [ResultDto])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResultDto)
  results: ResultDto[];
}
