import {LoggingService} from "@/libs/logging/services/logging.service";
import {KeyValueType} from "@/libs/common/types/key-value.type";
import {formatDatetime} from "@/libs/common/helpers/datetime.helpers";

export class RequestLoggingService {
  constructor(protected logger: LoggingService) {
  }

  protected log(labels: string|string[],
                requestUID: string,
                message: string,
                previousDatetimeStamp?: number,
                previousLabel?: string,
                data?: KeyValueType): void {
    const labelsLog = Array.isArray(labels) ?
      labels.map(label => `[${label}]`).join(' ') :
      `[labels]`;

    this.logger.log(`${message}`,
      null,
      {
        labels: labelsLog,
        requestUID,
        datetime: (new Date()).toISOString(),
        previousLabel,
        duration: previousDatetimeStamp &&
          formatDatetime(((new Date()).getTime() - previousDatetimeStamp) / 1000),
        ...(data || {})
      });
  }
}