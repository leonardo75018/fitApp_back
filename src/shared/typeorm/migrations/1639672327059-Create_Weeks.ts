import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateWeeks1639672327059 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'weeks',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'start',
            type: 'varchar',
          },
          {
            name: 'end',
            type: 'varchar',
          },
          {
            name: 'physical_plan_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'fk_physical_plan_id',
            columnNames: ['physical_plan_id'],
            referencedTableName: 'physical_plan',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('weeks');
  }

}
