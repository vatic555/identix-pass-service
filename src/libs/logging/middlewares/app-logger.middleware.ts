import {Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response, NextFunction} from 'express';

import {LoggingService} from "@/libs/logging/services/logging.service";
import {get} from "@/libs/common/helpers/object.helpers";

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggingService) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, path: url, query, params, body } = request;
    const userAgent = request.get('user-agent') || '';
    const ip =   get(request, 'clientIp') || request.ip

    const excludeHeaders = ['authorization'];
    const headers = Object.entries(request.headers)
      .filter(header => !excludeHeaders.includes(header[0]))
      .reduce((res, item) => {
        res[item[0]] = item[1];
        return res;
      }, {});

    response.on('finish', () => {
      const { statusCode, statusMessage } = response;
      const contentLength = response.get('content-length');

      this.logger.log(`Incoming request`, 'Express request handling', {
        request: { url, method, userAgent, ip, headers, query, params, body },
        response: { statusCode, statusMessage, contentLength }
      });
    });

    next();
  }
}
