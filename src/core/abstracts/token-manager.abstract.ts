export abstract class TokenManager {
  abstract sign(config: any): string;
  abstract verify(token): any;
}
