import { registerAs } from '@nestjs/config';
import { ENUM_CONFIG_KEY } from '@/configs/constants';

export default registerAs(ENUM_CONFIG_KEY.JWT, () => ({
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: process.env.JWT_EXPIRATION_TIME || '1h',
  },
}));
