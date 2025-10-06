import kafkaConfig from '@/config/kafka.config';
import postgresConfig from '@/config/postgres.config';

export * from './';
export * from './constants/config.enum';

export default [postgresConfig, kafkaConfig];
