import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Database } from '../database';
import { Contact, Patient } from '../database/mongo';
import { PatientResolver } from './patient.resolver';
import { PatientService } from './patient.service';

@Module({
  imports: [MikroOrmModule.forFeature([Patient, Contact], Database.Mongo)],
  providers: [PatientService, PatientResolver],
  exports: [PatientService],
})
export class PatientModule {}
