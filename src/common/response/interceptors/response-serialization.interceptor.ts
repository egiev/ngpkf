import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClassConstructor, ClassTransformOptions, instanceToPlain, plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { BaseDomainEntity } from '@/common/ddd';
import { RESPONSE_SERIALIZATION_KEY, RESPONSE_SERIALIZATION_OPTIONS_KEY } from '@/common/response/decorators';

@Injectable()
export class ResponseSerializationInterceptor<T> implements NestInterceptor<Promise<T>> {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const classSerialization = this.reflector.get<ClassConstructor<T>>(
      RESPONSE_SERIALIZATION_KEY,
      context.getHandler(),
    );

    const classSerializationOptions = this.reflector.get<ClassTransformOptions>(
      RESPONSE_SERIALIZATION_OPTIONS_KEY,
      context.getHandler(),
    );

    if (!classSerialization) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data: unknown) => {
        if (!data) return data;

        let raw: unknown;

        if (Array.isArray(data)) {
          const entities = data.filter(this.isDomainEntity);
          raw = entities.length ? entities.map((item) => item.toPrimitives()) : [];
        } else if (this.isDomainEntity(data)) {
          raw = data.toPrimitives();
        } else {
          return data;
        }

        const transformed = plainToInstance(
          classSerialization,
          raw,
          classSerializationOptions ?? {
            excludeExtraneousValues: true,
          },
        );

        return instanceToPlain(transformed, { excludeExtraneousValues: true });
      }),
    );
  }

  isDomainEntity = <T>(item: unknown): item is BaseDomainEntity<T> => {
    return typeof item === 'object' && typeof (item as BaseDomainEntity<any>).toPrimitives === 'function';
  };
}
