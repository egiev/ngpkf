import { Provider } from '@nestjs/common';
import { TokenManager } from '@core/abstracts';
import { JwtService } from './jwt.service';

export const jwtProvider: Provider[] = [
  {
    provide: TokenManager,
    useClass: JwtService,
  },
];
