import { EntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { ServiceAccountRepositoryPort } from '@/api-key/domain/ports';
import { ServiceAccount } from '@/api-key/domain/types';
import { ServiceAccountEntity } from '@/api-key/infrastructure/persistence/entities';
import { ENUM_DATABASE } from '@/common/database/constants';

@Injectable()
export class MikroormApiKeyRespositoryAdapter implements ServiceAccountRepositoryPort {
  constructor(
    @InjectRepository(ServiceAccountEntity, ENUM_DATABASE.Postgres)
    private readonly repository: EntityRepository<ServiceAccountEntity>,
  ) {}

  async findByClientId(clientId: string): Promise<ServiceAccount | null> {
    const entity = await this.repository.findOne({ clientId });
    if (!entity) return null;
    return entity;
  }
}
