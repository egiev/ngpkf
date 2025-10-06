import { envFilePathMapper } from '@/config/constants';

export function getEnvFilePath() {
  const nodeEnv = process.env.NODE_ENV;

  if (!nodeEnv) {
    throw new Error('NODE_ENV is missing. Please set NODE_ENV to one of: ' + Object.keys(envFilePathMapper).join(', '));
  }

  const filePath = envFilePathMapper[nodeEnv];

  if (!filePath) {
    throw new Error(`
      Unsupported NODE_ENV: "${nodeEnv}". Expected one of: ${Object.keys(envFilePathMapper).join(', ')}`);
  }

  return filePath;
}
