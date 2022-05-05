import {NestFactory} from '@nestjs/core';

import {LoggingService} from '@/libs/logging/services/logging.service';
import {AppModule} from './app.module';

require('dotenv').config(); // eslint-disable-line @typescript-eslint/no-var-requires

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = await app.resolve(LoggingService);

  const port = process.env.HTTP_PORT || 3000;
  await app.listen(port);

  logger.log(`Protek Manufacture's Cabinet JSON-RPC service started on http://0.0.0.0:${port}`);
}

bootstrap();