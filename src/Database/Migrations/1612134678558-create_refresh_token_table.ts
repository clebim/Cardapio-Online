import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createRefreshTokenTable1612134678558
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'refresh_tokens',
        columns: [
          {
            name: 'user_id',
            type: 'bigint',
            unsigned: true,
            isUnique: true,
          },
          {
            name: 'token',
            type: 'varchar',
            isPrimary: true,
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'expires_at',
            type: 'timestamp',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: 'refreshToken',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('refresh_tokens');
  }
}
