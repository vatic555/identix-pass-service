import { Module, DynamicModule } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { ConfigService, ConfigModule } from '@nestjs/config';

import { loggingFactory } from './providers/logging-options.provider';
import { LoggingOptions } from './types';
import { LoggingService } from './services/logging.service'

@Module({})
export class LoggingModule {
  public static forRoot(loggingOptions: LoggingOptions): DynamicModule {
    return {
      module: LoggingModule,
      imports: [
        LoggerModule.forRootAsync({
          useFactory: loggingFactory(loggingOptions),
          inject: [ ConfigService ],
          imports: [ ConfigModule ],
        })
      ],
      providers: [ LoggingService ],
      exports: [ LoggingService ]
    };
  }
}