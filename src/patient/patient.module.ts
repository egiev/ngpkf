import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Patient } from '../database/mongo/entities/patient.entity';
import { PatientResolver } from './patient.resolver';
import { PatientService } from './patient.service';

@Module({
  imports: [MikroOrmModule.forFeature([Patient], 'mongo')],
  providers: [PatientService, PatientResolver],
})
export class PatientModule {}
