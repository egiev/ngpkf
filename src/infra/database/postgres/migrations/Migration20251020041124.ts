import { Migration } from '@mikro-orm/migrations';

export class Migration20251020041124 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`drop table if exists "test_users" cascade;`);

    this.addSql(`alter table "users" alter column "username" type varchar(255) using ("username"::varchar(255));`);
    this.addSql(`alter table "users" alter column "username" set not null;`);
    this.addSql(`alter table "users" alter column "password" type varchar(255) using ("password"::varchar(255));`);
    this.addSql(`alter table "users" alter column "password" set not null;`);
    this.addSql(`alter table "users" alter column "is_super_user" type boolean using ("is_super_user"::boolean);`);
    this.addSql(`alter table "users" alter column "is_super_user" set not null;`);
    this.addSql(`alter table "users" alter column "is_staff" type boolean using ("is_staff"::boolean);`);
    this.addSql(`alter table "users" alter column "is_staff" set not null;`);
    this.addSql(`alter table "users" alter column "is_active" type boolean using ("is_active"::boolean);`);
    this.addSql(`alter table "users" alter column "is_active" set not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(
      `create table "test_users" ("id" varchar(255) not null, "username" varchar(255) not null, "password" varchar(255) not null, "is_super_user" boolean not null default false, "is_staff" boolean not null default false, "is_active" boolean not null default true, "created_at" timestamptz null, "updated_at" timestamptz null, constraint "test_users_pkey" primary key ("id"));`,
    );
    this.addSql(`alter table "test_users" add constraint "test_users_username_unique" unique ("username");`);

    this.addSql(`alter table "users" alter column "username" type varchar(255) using ("username"::varchar(255));`);
    this.addSql(`alter table "users" alter column "username" drop not null;`);
    this.addSql(`alter table "users" alter column "password" type varchar(255) using ("password"::varchar(255));`);
    this.addSql(`alter table "users" alter column "password" drop not null;`);
    this.addSql(`alter table "users" alter column "is_super_user" type boolean using ("is_super_user"::boolean);`);
    this.addSql(`alter table "users" alter column "is_super_user" drop not null;`);
    this.addSql(`alter table "users" alter column "is_staff" type boolean using ("is_staff"::boolean);`);
    this.addSql(`alter table "users" alter column "is_staff" drop not null;`);
    this.addSql(`alter table "users" alter column "is_active" type boolean using ("is_active"::boolean);`);
    this.addSql(`alter table "users" alter column "is_active" drop not null;`);
  }
}
