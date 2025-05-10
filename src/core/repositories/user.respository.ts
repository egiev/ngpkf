import { GenericRepository } from '@core/abstracts';
import { UserEntity } from '@core/entities';

export abstract class UserRepository extends GenericRepository<UserEntity> {}
