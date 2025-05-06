import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Patient } from '../database/mongo/entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update.patient.dto';
import { PatientService } from './patient.service';

@Resolver()
export class PatientResolver {
  constructor(private readonly patientService: PatientService) {}

  @Query(() => [Patient], { name: 'patients' })
  async findAll() {
    return await this.patientService.findAll();
  }

  @Query(() => Patient, { name: 'patient' })
  async findOne(@Args('mrn', { type: () => String }) mrn: string) {
    return await this.patientService.findOne(mrn);
  }

  @Mutation(() => Patient)
  async createPatient(@Args('createPatientInput') input: CreatePatientDto) {
    return await this.patientService.create(input);
  }

  @Mutation(() => Patient)
  async updateUser(
    @Args('id', { type: () => String }) id: string,
    @Args('updateUserInput') input: UpdatePatientDto,
  ) {
    return await this.patientService.update(id, input);
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('id', { type: () => String }) id: string) {
    await this.patientService.remove(id);
    return true;
  }
}
