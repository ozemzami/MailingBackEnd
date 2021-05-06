import { MigrationInterface, QueryRunner } from 'typeorm';

export class myInit1605004819452 implements MigrationInterface {
  name = 'myInit1605004819452';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "blacklist" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "time" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_04dc42a96bf0914cda31b579702" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "offer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "link" character varying NOT NULL, "unsub" character varying NOT NULL, CONSTRAINT "PK_57c6ae1abe49201919ef68de900" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "users_role_enum" AS ENUM('ADMIN', 'USER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "users_role_enum" NOT NULL DEFAULT 'USER', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "property" ("id" SERIAL NOT NULL, "indexName" character varying NOT NULL, "value" character varying NOT NULL, "subscriptionId" uuid, CONSTRAINT "PK_d80743e6191258a5003d5843b4f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "subscription" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "offerId" uuid, "userId" uuid, "clicksId" integer, "unsubsId" integer, CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "unsub" ("id" SERIAL NOT NULL, "ip" character varying NOT NULL, "time" TIMESTAMP NOT NULL DEFAULT now(), "emailId" integer, "subscriptionId" uuid, CONSTRAINT "PK_329e911e08ac942377199621b8c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "email" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_fee9013b697946e8129caba8983" UNIQUE ("email"), CONSTRAINT "PK_1e7ed8734ee054ef18002e29b1c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "click" ("id" SERIAL NOT NULL, "ip" character varying NOT NULL, "time" TIMESTAMP NOT NULL, "emailId" integer, "subscriptionId" uuid, CONSTRAINT "PK_4c018a5603e0d5e63fe022b0d97" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "whitelist" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "time" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0169bfbd49b0511243f7a068cec" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "property" ADD CONSTRAINT "FK_ad54f8295d2ed4ec7d7ccb34183" FOREIGN KEY ("subscriptionId") REFERENCES "subscription"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD CONSTRAINT "FK_306b184cb2974d656bacc2a1fb5" FOREIGN KEY ("offerId") REFERENCES "offer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD CONSTRAINT "FK_cc906b4bc892b048f1b654d2aa0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD CONSTRAINT "FK_1267eaf0092ecc5f533ba24fa1b" FOREIGN KEY ("clicksId") REFERENCES "click"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD CONSTRAINT "FK_676a203be42a17dbb7118bcb0e9" FOREIGN KEY ("unsubsId") REFERENCES "unsub"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "unsub" ADD CONSTRAINT "FK_8c2e8783ebe11608fa96b215131" FOREIGN KEY ("emailId") REFERENCES "email"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "unsub" ADD CONSTRAINT "FK_e560f46ae01b3c6d73cb9724284" FOREIGN KEY ("subscriptionId") REFERENCES "subscription"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "click" ADD CONSTRAINT "FK_1491a6918399c4449d5756bf6d7" FOREIGN KEY ("emailId") REFERENCES "email"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "click" ADD CONSTRAINT "FK_7705bf1b55e522c1307060597b4" FOREIGN KEY ("subscriptionId") REFERENCES "subscription"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `INSERT INTO users (email, password, role) VALUES ('oussamazemzami@gmail.com', 'azerty1234', 'ADMIN')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "click" DROP CONSTRAINT "FK_7705bf1b55e522c1307060597b4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "click" DROP CONSTRAINT "FK_1491a6918399c4449d5756bf6d7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "unsub" DROP CONSTRAINT "FK_e560f46ae01b3c6d73cb9724284"`,
    );
    await queryRunner.query(
      `ALTER TABLE "unsub" DROP CONSTRAINT "FK_8c2e8783ebe11608fa96b215131"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP CONSTRAINT "FK_676a203be42a17dbb7118bcb0e9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP CONSTRAINT "FK_1267eaf0092ecc5f533ba24fa1b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP CONSTRAINT "FK_cc906b4bc892b048f1b654d2aa0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP CONSTRAINT "FK_306b184cb2974d656bacc2a1fb5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "property" DROP CONSTRAINT "FK_ad54f8295d2ed4ec7d7ccb34183"`,
    );
    await queryRunner.query(`DROP TABLE "whitelist"`);
    await queryRunner.query(`DROP TABLE "click"`);
    await queryRunner.query(`DROP TABLE "email"`);
    await queryRunner.query(`DROP TABLE "unsub"`);
    await queryRunner.query(`DROP TABLE "subscription"`);
    await queryRunner.query(`DROP TABLE "property"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "users_role_enum"`);
    await queryRunner.query(`DROP TABLE "offer"`);
    await queryRunner.query(`DROP TABLE "blacklist"`);
  }
}
