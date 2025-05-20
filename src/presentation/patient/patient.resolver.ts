import { Args, Query, Resolver } from '@nestjs/graphql';
import { FindPatientCase } from '@application/use-cases';
import { PatientOrmEntity } from '@infrastructure/database/mongo';
import { maskEmail, maskMobile } from '@shared/utils';

@Resolver()
export class PatientResolver {
  constructor(private readonly findPatientCase: FindPatientCase) {}

  @Query(() => PatientOrmEntity, { name: 'patient' })
  async findOne(@Args('mrn', { type: () => String }) mrn: string) {
    const patient = await this.findPatientCase.execute(mrn);
    patient.contact.emailid = maskEmail(patient.contact.emailid);
    patient.contact.mobilephone = maskMobile(patient.contact.mobilephone);
    return patient;
  }
}
