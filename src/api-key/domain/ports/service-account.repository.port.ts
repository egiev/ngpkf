import { ServiceAccount } from '@/api-key/domain/types/service-account.type';

export abstract class ServiceAccountRepositoryPort {
  abstract findByClientId(clientId: string): Promise<ServiceAccount | null>;
}
