import { registerAs } from '@nestjs/config';
import { ENUM_CONFIG_KEY } from '@/configs/constants';

export default registerAs(ENUM_CONFIG_KEY.Kafka, () => ({
  brokers: [process.env.KAFKA_BROKER],
}));
