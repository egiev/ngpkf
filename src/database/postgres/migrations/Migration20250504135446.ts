import { Migration } from '@mikro-orm/migrations';

export class Migration20250504135446 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "user" rename column "topt_secret_key" to "totp_secret_key";`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "user" rename column "totp_secret_key" to "topt_secret_key";`,
    );
  }
}
