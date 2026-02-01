import { Migration } from '@mikro-orm/migrations';

export class Migration20260131234554 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`drop table if exists "users" cascade;`);

    this.addSql(`drop table if exists "whitelisted_order_items" cascade;`);

    this.addSql(`alter table "auth_groups" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);
    this.addSql(`alter table "auth_groups" alter column "created_at" set default now();`);

    this.addSql(`alter table "auth_permissions" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);
    this.addSql(`alter table "auth_permissions" alter column "created_at" set default now();`);

    this.addSql(`alter table "auth_users" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);
    this.addSql(`alter table "auth_users" alter column "created_at" set default now();`);

    this.addSql(`alter table "service_accounts" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);
    this.addSql(`alter table "service_accounts" alter column "created_at" set default now();`);
  }

  override async down(): Promise<void> {
    this.addSql(`create table "users" ("id" uuid not null, "user_id" varchar(255) not null, "totp_secret_key" varchar(255) not null, "last_request_at" timestamptz null, "created_at" timestamptz null, "updated_at" timestamptz null, constraint "users_pkey" primary key ("id"));`);

    this.addSql(`create table "whitelisted_order_items" ("id" uuid not null, "code" varchar(255) not null, "created_at" timestamptz null, "updated_at" timestamptz null, constraint "whitelisted_order_items_pkey" primary key ("id"));`);

    this.addSql(`alter table "auth_groups" alter column "created_at" drop default;`);
    this.addSql(`alter table "auth_groups" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);

    this.addSql(`alter table "auth_permissions" alter column "created_at" drop default;`);
    this.addSql(`alter table "auth_permissions" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);

    this.addSql(`alter table "auth_users" alter column "created_at" drop default;`);
    this.addSql(`alter table "auth_users" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);

    this.addSql(`alter table "service_accounts" alter column "created_at" drop default;`);
    this.addSql(`alter table "service_accounts" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);
  }

}
