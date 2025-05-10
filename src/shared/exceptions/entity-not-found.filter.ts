import { ArgumentsHost, Catch, NotFoundException } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { NotFoundError } from '@mikro-orm/core';

@Catch(NotFoundError)
export class EntityNotFoundFilter<T> implements GqlExceptionFilter {
  catch(exception: NotFoundError, host: ArgumentsHost) {
    GqlArgumentsHost.create(host);
    return new NotFoundException('Entity not found');
  }
}
