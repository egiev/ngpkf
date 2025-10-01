import { Entity } from '@mikro-orm/core';
import { PrimaryKey } from '@mikro-orm/postgresql';
import { v4 } from 'uuid';

@Entity()
export class User {
  @PrimaryKey()
  private id: string = v4();
}
