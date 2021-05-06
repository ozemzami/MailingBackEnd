import {MigrationInterface, QueryRunner} from "typeorm";

export class v21606387968810 implements MigrationInterface {
    name = 'v21606387968810'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "click" ALTER COLUMN "time" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "click" ALTER COLUMN "time" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "click" ALTER COLUMN "time" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "click" ALTER COLUMN "time" DROP DEFAULT`);
    }

}
