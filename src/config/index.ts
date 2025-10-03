import kafkaConfig from './kafka.config';
import postgresConfig from './postgres.config';

export * from './env.helper';
export * from './keys';

export default [postgresConfig, kafkaConfig];
