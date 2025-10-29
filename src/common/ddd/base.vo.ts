export abstract class BaseVO<T> {
  private readonly _value: T;

  constructor(value: T) {
    this._value = value;
    this.ensureInvariants();
  }

  protected abstract ensureInvariants(): void;

  public static create<V extends BaseVO<any>>(this: new (value: any) => V, value: any): V {
    return new this(value);
  }

  public static fromPrimitives<V extends BaseVO<any>>(this: new (value: any) => V, value: any): V {
    return new this(value);
  }

  public toPrimitives(): T {
    return this.value;
  }

  public get value(): T {
    return this._value;
  }

  public equals(other: BaseVO<T>): boolean {
    if (this.constructor !== other.constructor) {
      return false;
    }

    if (this.value === 'object' && this.value !== null) {
      return JSON.stringify(this.value) === JSON.stringify(other.value);
    }

    return this.value === other.value;
  }
}
