import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  Table
} from "typeorm";

export class CreateTableUsers1629793100105 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'int',
            isGenerated: true,
            isPrimary: true,
            unsigned: true,
            generationStrategy: 'increment',
          }),
          new TableColumn({
            name: 'did',
            type: 'varchar',
            length: '1024',
            isNullable: false,
            isUnique: true
          }),
          new TableColumn({
            name: 'lastActivity',
            type: 'timestamp',
            isNullable: true,
            default: 'CURRENT_TIMESTAMP'
          }),
          new TableColumn({
            name: 'createdAt',
            type: 'timestamp',
            isNullable: true,
            default: 'CURRENT_TIMESTAMP',
          }),
          new TableColumn({
            name: 'updatedAt',
            type: 'timestamp',
            isNullable: true,
            default: 'CURRENT_TIMESTAMP',
          }),
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
