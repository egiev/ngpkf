import { Migration } from '@mikro-orm/migrations';

export class Migration20251026154200 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "users" ("id" uuid not null, "user_id" varchar(255) not null, "totp_secret_key" varchar(255) not null, "last_request_at" timestamptz null, "created_at" timestamptz null, "updated_at" timestamptz null, constraint "users_pkey" primary key ("id"));`,
    );

    this.addSql(`drop table if exists "user_entity" cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(
      `create table "user_entity" ("id" uuid not null, "user_id" varchar(255) not null, "totp_secret_key" varchar(255) not null, "last_request_at" timestamptz null, "created_at" timestamptz null, "updated_at" timestamptz null, constraint "user_entity_pkey" primary key ("id"));`,
    );

    this.addSql(`drop table if exists "users" cascade;`);
  }
}
