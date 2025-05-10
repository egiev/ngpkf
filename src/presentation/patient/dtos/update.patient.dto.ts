import { InputType, PartialType } from '@nestjs/graphql';
import { CreatePatientDto } from './create-patient.dto';

@InputType()
export class UpdatePatientDto extends PartialType(CreatePatientDto) {}
