import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { ClassConstructor, ClassTransformOptions } from 'class-transformer';
import { ResponseSerializationInterceptor } from '@/common/response/interceptors';

export const RESPONSE_SERIALIZATION_KEY = Symbol('RESPONSE_SERIALIZATION');
export const RESPONSE_SERIALIZATION_OPTIONS_KEY = Symbol('RESPONSE_SERIALIZATION_OPTIONS');

export function Response<T>(options: {
  serialization: ClassConstructor<T> | null;
  transformOptions?: ClassTransformOptions;
}) {
  return applyDecorators(
    UseInterceptors(ResponseSerializationInterceptor),
    SetMetadata(RESPONSE_SERIALIZATION_KEY, options.serialization),
    SetMetadata(RESPONSE_SERIALIZATION_OPTIONS_KEY, options.transformOptions),
  );
}
