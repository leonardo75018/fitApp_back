import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateExerciceSession1639775650222 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'exercice_session',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'repetitions',
            type: 'varchar',
          },
          {
            name: 'intensity',
            type: 'varchar',
          },
          {
            name: 'sessions_id',
            type: 'uuid',
          },
          {
            name: 'exercices_id',
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
            name: 'fk_sessions_id',
            columnNames: ['sessions_id'],
            referencedTableName: 'sessions',
            referencedColumnNames: ['id'],
          },
          {
            name: 'fk_exercices_id',
            columnNames: ['exercices_id'],
            referencedTableName: 'exercices',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('exercice_session');
  }
}
