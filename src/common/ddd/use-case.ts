export type UseCase<P, R> = {
  execute(params?: P): Promise<R>;
};
