import { registerAs } from '@nestjs/config';
import { StringValue } from 'ms';
import { ENUM_CONFIG_KEY } from '@/configs/constants';

export default registerAs(ENUM_CONFIG_KEY.RefreshJWT, () => ({
  secret: process.env.JWT_REFRESH_SECRET || 'secr3t-k3y',
  expiresIn: (process.env.JWT_REFRESH_EXPIRATION_TIME || '1d') as StringValue,
}));
