import { Provider } from '@nestjs/common';

export function createUseCaseProvider<T>(
  useCaseClass: new (...args: any[]) => T,
  dependencies: any[],
): Provider {
  return {
    provide: useCaseClass,
    useFactory: (...args: any[]) => new useCaseClass(...args),
    inject: dependencies,
  };
}
