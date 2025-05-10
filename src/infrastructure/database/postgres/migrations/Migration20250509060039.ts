import { Migration } from '@mikro-orm/migrations';

export class Migration20250509060039 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "user_orm_entity" ("id" uuid not null, "user_id" varchar(255) not null, "totp_secret_key" varchar(255) not null, "last_request_at" timestamptz null, "created_at" timestamptz null, "updated_at" timestamptz null, constraint "user_orm_entity_pkey" primary key ("id"));`,
    );

    this.addSql(`drop table if exists "user" cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(
      `create table "user" ("id" uuid not null, "user_id" varchar(255) not null, "totp_secret_key" varchar(255) not null, "last_request_at" timestamptz null, "created_at" timestamptz null, "updated_at" timestamptz null, constraint "user_pkey" primary key ("id"));`,
    );

    this.addSql(`drop table if exists "user_orm_entity" cascade;`);
  }
}
