import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity({ tableName: 'service_accounts' })
export class ServiceAccountEntity {
  @PrimaryKey()
  id: string = v4();

  @Property({ unique: true })
  clientId!: string;

  @Property({ unique: true })
  apiKeyHash!: string;

  @Property({ default: true })
  isActive: boolean;

  @Property({ nullable: true })
  createdAt?: Date = new Date();

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt?: Date = new Date();
}
