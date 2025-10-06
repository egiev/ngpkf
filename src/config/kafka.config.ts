import { registerAs } from '@nestjs/config';
import { ENUM_CONFIG_KEY } from '@/config/constants';

export default registerAs(
  ENUM_CONFIG_KEY.Kafka,
  (): Record<string, any> => ({
    brokers: [process.env.KAFKA_BROKER],
  }),
);
