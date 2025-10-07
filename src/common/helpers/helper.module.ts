import { Module } from '@nestjs/common';
import { HelperHashService } from '@/common/helpers/services';

@Module({ providers: [HelperHashService], exports: [HelperHashService] })
export class HelperModule {}
