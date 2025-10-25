import { Migration } from '@mikro-orm/migrations';

export class Migration20251024055715 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "service_accounts" ("id" varchar(255) not null, "client_id" varchar(255) not null, "api_key_hash" varchar(255) not null, "is_active" boolean not null default true, "created_at" timestamptz null, "updated_at" timestamptz null, constraint "service_accounts_pkey" primary key ("id"));`,
    );
    this.addSql(
      `alter table "service_accounts" add constraint "service_accounts_client_id_unique" unique ("client_id");`,
    );
    this.addSql(
      `alter table "service_accounts" add constraint "service_accounts_api_key_hash_unique" unique ("api_key_hash");`,
    );

    this.addSql(`drop table if exists "api_keys" cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(
      `create table "api_keys" ("id" varchar(255) not null, "client_id" varchar(255) not null, "api_key_hash" varchar(255) not null, "is_active" boolean not null default true, "created_at" timestamptz null, "updated_at" timestamptz null, constraint "api_keys_pkey" primary key ("id"));`,
    );
    this.addSql(`alter table "api_keys" add constraint "api_keys_client_id_unique" unique ("client_id");`);
    this.addSql(`alter table "api_keys" add constraint "api_keys_api_key_hash_unique" unique ("api_key_hash");`);

    this.addSql(`drop table if exists "service_accounts" cascade;`);
  }
}
