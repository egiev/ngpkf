import { registerAs } from '@nestjs/config';
import { ENUM_CONFIG_KEY } from '@/configs/constants';

export default registerAs(ENUM_CONFIG_KEY.RefreshJWT, () => ({
  secret: process.env.JWT_REFRESH_SECRET,
  expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME,
}));
