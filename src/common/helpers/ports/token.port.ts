export type Token = { accessToken: string; refreshToken: string; expiresIn: number; expirationTimestamp: number };

export abstract class TokenPort {
  abstract signAccessToken(payload: any): Promise<Token>;
  abstract refreshToken(token: string): Promise<Token>;
  abstract verify(token: string): Promise<Token>;
}
