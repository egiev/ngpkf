import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';
import { ENUM_CONFIG_KEY } from '@/config/constants';

export default registerAs(
  ENUM_CONFIG_KEY.RefreshJWT,
  (): JwtSignOptions => ({
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME,
  }),
);
