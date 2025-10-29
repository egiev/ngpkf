import { Migration } from '@mikro-orm/migrations';

export class Migration20251026233721 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "whitelisted_order_items" ("id" uuid not null, "code" varchar(255) not null, "created_at" timestamptz null, "updated_at" timestamptz null, constraint "whitelisted_order_items_pkey" primary key ("id"));`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "whitelisted_order_items" cascade;`);
  }
}
