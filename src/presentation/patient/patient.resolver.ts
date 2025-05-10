import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePatientCase, FindPatientCase } from '@application/use-cases';
import { PatientOrmEntity } from '@infrastructure/database/mongo';
import { maskEmail, maskMobile } from '@shared/utils';
import { CreatePatientDto } from './dtos';

@Resolver()
export class PatientResolver {
  constructor(
    private readonly findPatientCase: FindPatientCase,
    private readonly createPatientCase: CreatePatientCase,
  ) {}

  // @Query(() => [Patient], { name: 'patients' })
  // async findAll() {
  //   return await this.patientService.findAll();
  // }

  @Query(() => PatientOrmEntity, { name: 'patient' })
  async findOne(@Args('mrn', { type: () => String }) mrn: string) {
    const patient = await this.findPatientCase.execute(mrn);
    patient.contact.email = maskEmail(patient.contact.email);
    patient.contact.mobile = maskMobile(patient.contact.mobile);
    return patient;
  }

  @Mutation(() => PatientOrmEntity)
  async createPatient(@Args('createPatientInput') input: CreatePatientDto) {
    console.log(input);
    return await this.createPatientCase.execute(input);
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
