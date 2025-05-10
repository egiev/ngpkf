import { Migration } from '@mikro-orm/migrations';

export class Migration20250504134030 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "user" drop column "name", drop column "email", drop column "age";`,
    );

    this.addSql(
      `alter table "user" add column "user_id" varchar(255) not null, add column "topt_secret_key" varchar(255) not null, add column "last_request_at" timestamptz null;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "user" drop column "user_id", drop column "topt_secret_key", drop column "last_request_at";`,
    );

    this.addSql(
      `alter table "user" add column "name" varchar(255) not null, add column "email" varchar(255) not null, add column "age" int null;`,
    );
  }
}
