import { Migration } from '@mikro-orm/migrations';

export class Migration20250311062951 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "user" alter column "id" drop default;`);
    this.addSql(
      `alter table "user" alter column "id" type uuid using ("id"::text::uuid);`,
    );
    this.addSql(`alter table "user" alter column "id" drop default;`);
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "user" alter column "id" type text using ("id"::text);`,
    );

    this.addSql(
      `alter table "user" alter column "id" type int4 using ("id"::int4);`,
    );
    this.addSql(`create sequence if not exists "user_id_seq";`);
    this.addSql(
      `select setval('user_id_seq', (select max("id") from "user"));`,
    );
    this.addSql(
      `alter table "user" alter column "id" set default nextval('user_id_seq');`,
    );
  }
}
