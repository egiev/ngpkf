import { Module } from '@nestjs/common';
import { InfrastructureModule } from '@infrastructure';
import { PatientResolver } from './patient.resolver';

@Module({
  imports: [InfrastructureModule],
  providers: [PatientResolver],
})
export class PatientModule {}
