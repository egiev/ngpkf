import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PatientAdapter } from '@application/adapters';
import { PatientOrmEntity } from '@infrastructure/database/mongo';
import { maskEmail, maskMobile } from '@shared/utils';
import { CreatePatientDto } from './dtos';

@Resolver()
export class PatientResolver {
  constructor(private readonly patientAdapter: PatientAdapter) {}

  // @Query(() => [Patient], { name: 'patients' })
  // async findAll() {
  //   return await this.patientService.findAll();
  // }

  @Query(() => PatientOrmEntity, { name: 'patient' })
  async findOne(@Args('mrn', { type: () => String }) mrn: string) {
    const patient = await this.patientAdapter.findOne(mrn);
    patient.contact.email = maskEmail(patient.contact.email);
    patient.contact.mobile = maskMobile(patient.contact.mobile);
    return patient;
  }

  @Mutation(() => PatientOrmEntity)
  async createPatient(@Args('createPatientInput') input: CreatePatientDto) {
    console.log(input);
    return await this.patientAdapter.create(input);
  }

  // @Mutation(() => Patient)
  // async updateUser(
  //   @Args('id', { type: () => String }) id: string,
  //   @Args('updateUserInput') input: UpdatePatientDto,
  // ) {
  //   return await this.patientService.update(id, input);
  // }

  // @Mutation(() => Boolean)
  // async removeUser(@Args('id', { type: () => String }) id: string) {
  //   await this.patientService.remove(id);
  //   return true;
  // }
}
