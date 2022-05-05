import {MigrationInterface, QueryRunner, Table, TableColumn} from "typeorm";

export class CreateTableEventLog1651656218056 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "event_log_types" AS ENUM(
          'ISSUER_VC',
          'REQUEST_VC_VERIFICATION',
          'VERIFICATED'
        )
      `);

    await queryRunner.createTable(
      new Table({
        name: 'event-log',
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
            name: 'ownerDid',
            type: 'varchar',
            length: '1024',
            isNullable: false
          }),
          new TableColumn({
            name: 'eventType',
            type: 'event_log_types',
            isNullable: false
          }),
          new TableColumn({
            name: 'vcDid',
            type: 'varchar',
            length: '1024',
            isNullable: false
          }),
          new TableColumn({
            name: 'message',
            type: 'text',
            isNullable: false
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

  public async down(): Promise<void> {
  }
}
