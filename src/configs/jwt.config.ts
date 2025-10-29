import { registerAs } from '@nestjs/config';
import { StringValue } from 'ms';
import { ENUM_CONFIG_KEY } from '@/configs/constants';

export default registerAs(ENUM_CONFIG_KEY.JWT, () => ({
  secret: process.env.JWT_SECRET || 'secr3t-k3y',
  signOptions: {
    expiresIn: (process.env.JWT_EXPIRATION_TIME || '1d') as StringValue,
  },
}));
