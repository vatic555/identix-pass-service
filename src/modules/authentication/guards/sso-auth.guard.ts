import {Injectable, ExecutionContext} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {GqlExecutionContext} from '@nestjs/graphql';
import {ExtendedRequest} from "../types";

@Injectable()
export class SsoAuthGuard extends AuthGuard('sso') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipAuthentication =
      process.env.SKIP_AUTHENTICATION && process.env.SKIP_AUTHENTICATION === "true";

    if (skipAuthentication) {
      return true;
    }

    if (! await super.canActivate(context)) {
      return false;
    }

    const { userDid } = this.getRequest(context);
    console.log(`userDid: ${userDid}`);

    return true;
  }

  getRequest(context: ExecutionContext): ExtendedRequest {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}