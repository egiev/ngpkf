export abstract class BaseDomainEntity<T> {
  abstract toPrimitives(): T;
}
