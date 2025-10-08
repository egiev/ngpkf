import { Migration } from '@mikro-orm/migrations';

export class Migration20251008083244 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "group_permission_entity" drop constraint "group_permission_entity_group_id_foreign";`);

    this.addSql(`alter table "user_group_entity" drop constraint "user_group_entity_group_id_foreign";`);

    this.addSql(
      `alter table "group_permission_entity" drop constraint "group_permission_entity_permission_id_foreign";`,
    );

    this.addSql(`alter table "user_permission_entity" drop constraint "user_permission_entity_permission_id_foreign";`);

    this.addSql(`alter table "user_group_entity" drop constraint "user_group_entity_user_id_foreign";`);

    this.addSql(`alter table "user_permission_entity" drop constraint "user_permission_entity_user_id_foreign";`);

    this.addSql(
      `create table "groups" ("id" varchar(255) not null, "name" varchar(255) not null, "created_at" timestamptz null, "updated_at" timestamptz null, constraint "groups_pkey" primary key ("id"));`,
    );
    this.addSql(`alter table "groups" add constraint "groups_name_unique" unique ("name");`);

    this.addSql(
      `create table "permissions" ("id" varchar(255) not null, "name" varchar(255) not null, "created_at" timestamptz null, "updated_at" timestamptz null, constraint "permissions_pkey" primary key ("id"));`,
    );
    this.addSql(`alter table "permissions" add constraint "permissions_name_unique" unique ("name");`);

    this.addSql(
      `create table "group_permissions" ("id" varchar(255) not null, "group_id" varchar(255) null, "permission_id" varchar(255) null, constraint "group_permissions_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "users" ("id" varchar(255) not null, "username" varchar(255) null, "password" varchar(255) null, "is_super_user" boolean null default false, "is_staff" boolean null default false, "is_active" boolean null default true, "created_at" timestamptz null, "updated_at" timestamptz null, constraint "users_pkey" primary key ("id"));`,
    );
    this.addSql(`alter table "users" add constraint "users_username_unique" unique ("username");`);

    this.addSql(
      `create table "user_groups" ("id" varchar(255) not null, "user_id" varchar(255) null, "group_id" varchar(255) null, constraint "user_groups_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "user_permissions" ("id" varchar(255) not null, "user_id" varchar(255) null, "permission_id" varchar(255) null, constraint "user_permissions_pkey" primary key ("id"));`,
    );

    this.addSql(
      `alter table "group_permissions" add constraint "group_permissions_group_id_foreign" foreign key ("group_id") references "groups" ("id") on delete cascade;`,
    );
    this.addSql(
      `alter table "group_permissions" add constraint "group_permissions_permission_id_foreign" foreign key ("permission_id") references "permissions" ("id") on delete cascade;`,
    );

    this.addSql(
      `alter table "user_groups" add constraint "user_groups_user_id_foreign" foreign key ("user_id") references "users" ("id") on delete cascade;`,
    );
    this.addSql(
      `alter table "user_groups" add constraint "user_groups_group_id_foreign" foreign key ("group_id") references "groups" ("id") on delete cascade;`,
    );

    this.addSql(
      `alter table "user_permissions" add constraint "user_permissions_user_id_foreign" foreign key ("user_id") references "users" ("id") on delete cascade;`,
    );
    this.addSql(
      `alter table "user_permissions" add constraint "user_permissions_permission_id_foreign" foreign key ("permission_id") references "permissions" ("id") on delete cascade;`,
    );

    this.addSql(`drop table if exists "group_entity" cascade;`);

    this.addSql(`drop table if exists "group_permission_entity" cascade;`);

    this.addSql(`drop table if exists "permission_entity" cascade;`);

    this.addSql(`drop table if exists "session" cascade;`);

    this.addSql(`drop table if exists "user_entity" cascade;`);

    this.addSql(`drop table if exists "user_group_entity" cascade;`);

    this.addSql(`drop table if exists "user_permission_entity" cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "group_permissions" drop constraint "group_permissions_group_id_foreign";`);

    this.addSql(`alter table "user_groups" drop constraint "user_groups_group_id_foreign";`);

    this.addSql(`alter table "group_permissions" drop constraint "group_permissions_permission_id_foreign";`);

    this.addSql(`alter table "user_permissions" drop constraint "user_permissions_permission_id_foreign";`);

    this.addSql(`alter table "user_groups" drop constraint "user_groups_user_id_foreign";`);

    this.addSql(`alter table "user_permissions" drop constraint "user_permissions_user_id_foreign";`);

    this.addSql(
      `create table "group_entity" ("id" varchar(255) not null, "name" varchar(255) not null, "created_at" timestamptz(6) null, "updated_at" timestamptz(6) null, constraint "group_entity_pkey" primary key ("id"));`,
    );
    this.addSql(`alter table "group_entity" add constraint "group_entity_name_unique" unique ("name");`);

    this.addSql(
      `create table "group_permission_entity" ("id" varchar(255) not null, "group_id" varchar(255) null, "permission_id" varchar(255) null, constraint "group_permission_entity_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "permission_entity" ("id" varchar(255) not null, "name" varchar(255) not null, "created_at" timestamptz(6) null, "updated_at" timestamptz(6) null, constraint "permission_entity_pkey" primary key ("id"));`,
    );
    this.addSql(`alter table "permission_entity" add constraint "permission_entity_name_unique" unique ("name");`);

    this.addSql(
      `create table "session" ("sid" varchar not null, "sess" json not null, "expire" timestamp(6) not null, constraint "session_pkey" primary key ("sid"));`,
    );
    this.addSql(`create index "IDX_session_expire" on "session" ("expire");`);

    this.addSql(
      `create table "user_entity" ("id" varchar(255) not null, "username" varchar(255) null, "password" varchar(255) null, "is_super_user" bool null default false, "is_staff" bool null default false, "is_active" bool null default true, "created_at" timestamptz(6) null, "updated_at" timestamptz(6) null, constraint "user_entity_pkey" primary key ("id"));`,
    );
    this.addSql(`alter table "user_entity" add constraint "user_entity_username_unique" unique ("username");`);

    this.addSql(
      `create table "user_group_entity" ("id" varchar(255) not null, "user_id" varchar(255) null, "group_id" varchar(255) null, constraint "user_group_entity_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "user_permission_entity" ("id" varchar(255) not null, "user_id" varchar(255) null, "permission_id" varchar(255) null, constraint "user_permission_entity_pkey" primary key ("id"));`,
    );

    this.addSql(`drop table if exists "groups" cascade;`);

    this.addSql(`drop table if exists "permissions" cascade;`);

    this.addSql(`drop table if exists "group_permissions" cascade;`);

    this.addSql(`drop table if exists "users" cascade;`);

    this.addSql(`drop table if exists "user_groups" cascade;`);

    this.addSql(`drop table if exists "user_permissions" cascade;`);
  }
}
