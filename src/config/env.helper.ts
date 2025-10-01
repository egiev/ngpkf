const mapper: Record<string, string> = {
  dev: '.env.dev',
  prod: '.env.prod',
};

export function getEnvFilePath() {
  const nodeEnv = process.env.NODE_ENV || 'dev';

  const filePath = mapper[nodeEnv];

  if (!filePath) {
    throw new Error('No matching .env file for NODE_ENV="${nodeEnv}');
  }

  return filePath;
}
