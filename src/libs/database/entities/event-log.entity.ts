import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import {Field, Int, ObjectType} from "@nestjs/graphql";
import {EventTypes} from "../types/event-types.type";

@Entity("event-log")
@ObjectType()
export class EventLogEntity {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column({
    name: 'ownerDid',
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  @Field({nullable: false})
  public ownerDid: string;

  @Column({
    name: 'eventType',
    type: "enum",
    enum: EventTypes,
    nullable: false
  })
  @Field({nullable: false})
  public eventType: EventTypes;

  @Column({
    name: 'vcDid',
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  @Field({nullable: false})
  public vcDid: string;

  @Column({
    name: 'message',
    type: 'text',
    nullable: false,
  })
  @Field({nullable: false})
  public message: string;

  @Column({
    name: 'createdAt',
    type: 'timestamp',
    nullable: true,
    default: 'CURRENT_TIMESTAMP'
  })
  @Field({nullable: false})
  public createdAt: Date;

  @UpdateDateColumn({
    name: 'updatedAt',
    type: 'timestamp',
    nullable: true,
    default: 'CURRENT_TIMESTAMP'
  })
  @Field({nullable: false})
  public updatedAt: Date;
}

export class EventLogListSearchResult {
  @Field(type => [EventLogEntity])
  public eventLog: EventLogEntity[];

  @Field(type => Int)
  public total: number;
}

