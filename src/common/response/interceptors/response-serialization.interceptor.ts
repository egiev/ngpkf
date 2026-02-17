import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClassConstructor, ClassTransformOptions, plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
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

    return next.handle().pipe(
      map((data: unknown) => {
        let transformed = data;

        // Directly transform plain object into DTO
        if (classSerialization) {
          transformed = plainToInstance(
            classSerialization,
            data,
            classSerializationOptions ?? { excludeExtraneousValues: true },
          );
        }

        return {
          success: true,
          // message: data?.message ?? null,
          data: transformed ?? null,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
