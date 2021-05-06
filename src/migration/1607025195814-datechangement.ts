import {MigrationInterface, QueryRunner} from "typeorm";

export class datechangement1607025195814 implements MigrationInterface {
    name = 'datechangement1607025195814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unsub" ALTER COLUMN "time" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "click" ALTER COLUMN "time" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "unsub" ALTER COLUMN "time" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "click" ALTER COLUMN "time" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "click" ALTER COLUMN "time" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "unsub" ALTER COLUMN "time" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "click" ALTER COLUMN "time" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "unsub" ALTER COLUMN "time" SET DEFAULT now()`);
    }

}
