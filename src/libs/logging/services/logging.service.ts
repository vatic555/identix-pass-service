import { Injectable, Scope  } from '@nestjs/common';
import { Logger } from 'nestjs-pino'

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService extends Logger {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public log(message: string, context?: string, ...args): void {
    const logPrettyPrint = process.env.LOG_PRETTY_PRINT && process.env.LOG_PRETTY_PRINT === "true";

    let params = {};
    if (args && Array.isArray(args)) {
      for (const arg of args) {
        params = { ... params, ... arg };
      }
    }

    const datetime = (new Date()).toISOString();
    const log = context ?
      { datetime, context, message, ...params } :
      { datetime, message, ...params };

    if (logPrettyPrint) {
      this.logger.info(log);
      return;
    }

    console.log(JSON.stringify(log));
  }
}