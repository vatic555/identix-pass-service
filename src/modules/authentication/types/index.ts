import {ExecutionContext} from "@nestjs/common";
import {Request} from 'express';
import {Did} from "@/libs/vc-brokerage/types";

export type Headers = { [key: string]: string | number}

export interface ExtendedExecutionContext extends ExecutionContext {
  headers: Headers
}

export interface ExtendedRequest extends Request {
  userDid: Did;
}
