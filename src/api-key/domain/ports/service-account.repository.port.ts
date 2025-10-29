import { ServiceAccount } from '@/api-key/domain/types';

export abstract class ServiceAccountRepositoryPort {
  abstract findByClientId(clientId: string): Promise<ServiceAccount | null>;
}
