// eslint-disable-next-line @typescript-eslint/no-implied-eval, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
export const dynamicImport = async (packageName: string) => await new Function(`return import("${packageName}")`)();
