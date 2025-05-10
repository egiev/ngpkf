import { Module } from '@nestjs/common';
import { MongoModule, patientProvider } from '@infrastructure/database/mongo';
import { PatientResolver } from './patient.resolver';

@Module({
  imports: [MongoModule],
  providers: [...patientProvider, PatientResolver],
})
export class PatientModule {}
