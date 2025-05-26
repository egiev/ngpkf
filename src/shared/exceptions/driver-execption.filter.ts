import {
  ArgumentsHost,
  Catch,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { DriverException } from '@mikro-orm/core';

@Catch(DriverException)
export class DriverExceptionFilter implements GqlExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    return new InternalServerErrorException('Somethikng went wrong');
  }
}
