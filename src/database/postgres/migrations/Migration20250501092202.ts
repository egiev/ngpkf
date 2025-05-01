import { Migration } from '@mikro-orm/migrations';

export class Migration20250501092202 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "user" ("id" uuid not null, "created_at" timestamptz null, "updated_at" timestamptz null, "name" varchar(255) not null, "email" varchar(255) not null, "age" int null, constraint "user_pkey" primary key ("id"));`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "user" cascade;`);
  }
}
