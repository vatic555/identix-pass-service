import {Entity, PrimaryGeneratedColumn} from "typeorm";
import {Field, Int} from "@nestjs/graphql";

@Entity("mq-storage")
export class MqStorageEntity {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;
}
