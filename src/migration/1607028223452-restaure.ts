import {MigrationInterface, QueryRunner} from "typeorm";

export class restaure1607028223452 implements MigrationInterface {
    name = 'restaure1607028223452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unsub" ALTER COLUMN "time" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "click" ALTER COLUMN "time" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "click" ALTER COLUMN "time" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "unsub" ALTER COLUMN "time" DROP DEFAULT`);
    }

}
