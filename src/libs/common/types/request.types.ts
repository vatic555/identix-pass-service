import { Request } from "express";

export type UserQueryType = {
  userInfo?: Array<{
    userId: string,
    fullname: string,
    userRole: string
  }>
  email?: string;
}

export interface UserIncludedRequest extends Request {
  user: UserQueryType
}