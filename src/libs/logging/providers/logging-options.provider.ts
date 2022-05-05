import { Params } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

import { LoggingOptions } from '../types';

export const loggingFactory = (loggingOptions: LoggingOptions) => (
  configService: ConfigService
): Params => {
  const { serviceName } = loggingOptions;

  const logPrettyPrint = process.env.LOG_PRETTY_PRINT && process.env.LOG_PRETTY_PRINT === "true";
  const pinoHttp =  {
    prettyPrint: logPrettyPrint || {
      translateTime: 'UTC:mm/dd/yyyy, h:MM:ss TT Z',
      levelFirst: false,
      colorize: true,
      singleLine: true
    },
    name: serviceName,
    level: configService.get<string>('LOG_LEVEL') || 'info'
  };

  return { pinoHttp };
};
