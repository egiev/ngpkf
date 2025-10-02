const mapper: Record<string, string> = {
  dev: '.env.dev',
  prod: '.env.prod',
};

export function getEnvFilePath() {
  const nodeEnv = process.env.NODE_ENV;

  if (!nodeEnv) {
    throw new Error('NODE_ENV is missing. Please set NODE_ENV to one of: ' + Object.keys(mapper).join(', '));
  }

  const filePath = mapper[nodeEnv];

  if (!filePath) {
    throw new Error(`Unsupported NODE_ENV: "${nodeEnv}". Expected one of: ${Object.keys(mapper).join(', ')}`);
  }

  return filePath;
}
