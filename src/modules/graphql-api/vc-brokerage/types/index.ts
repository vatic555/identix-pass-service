import {Field, Int, ObjectType} from "@nestjs/graphql";
import {Did} from "@/libs/vc-brokerage/types"
import {Column} from "typeorm";
import {EventTypes} from "@/libs/database/types/event-types.type";

@ObjectType()
export class VcTypeInfo {
  @Field(type => String)
  vcTypeDid: Did;

  @Field(type => String)
  vcTypeTag: string
}

