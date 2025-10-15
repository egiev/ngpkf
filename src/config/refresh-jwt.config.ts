import { registerAs } from '@nestjs/config';
import { ENUM_CONFIG_KEY } from '@/config/constants';

export default registerAs(
  ENUM_CONFIG_KEY.RefreshJWT,
  (): Record<string, any> => ({
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME,
  }),
);
