import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { ENUM_CONFIG_KEY } from '@/config/constants';

export default registerAs(
  ENUM_CONFIG_KEY.JWT,
  (): JwtModuleOptions => ({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: process.env.JWT_EXPIRATION_TIME || '1h',
    },
  }),
);
