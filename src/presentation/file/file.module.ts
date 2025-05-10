import { Module } from '@nestjs/common';
import { InfrastructureModule } from '@infrastructure';
import { FileController } from './file.controller';

@Module({
  imports: [InfrastructureModule],
  controllers: [FileController],
})
export class FileModule {}
