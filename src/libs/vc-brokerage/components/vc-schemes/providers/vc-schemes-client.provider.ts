import {LoggingService} from "@/libs/logging/services/logging.service";
import {VcSchemesClient, IVcSchemesClient, IVcScheme} from "../types";
import {VcSchemesClientService} from "../services/vc-schemes-client.service";
import {existsSync} from "fs";
import {getDirectoryFilesList} from "@/libs/common/helpers/files.helpers";

export const VcSchemesClientProvider = {
  provide: VcSchemesClient,
  useFactory: (logger: LoggingService): Promise<IVcSchemesClient> => vcSchemesClientFactory(logger),
  inject: [LoggingService],
};

async function  vcSchemesClientFactory(logger: LoggingService): Promise<IVcSchemesClient> {
  const vcSchemesPath = process.env.VC_SCHEMES_PATH;
  if (!vcSchemesPath) {
    throw new Error(`VC Schemes path configuration is invalid!`);
  }

  const  fullVcSchemesPath = `${process.cwd()}/${vcSchemesPath}`;
  if (!existsSync(fullVcSchemesPath)) {
    throw new Error(`VC Schemes Client configuration is invalid: VC Schemes path is incorrect!`);
  }

  const vcSchemesStorage: Set<IVcScheme> = new Set<IVcScheme>();

  const files = await getDirectoryFilesList(vcSchemesPath);
  for await (const filename of files) {
    try {
      const scheme = require(`${process.cwd()}/${vcSchemesPath}/${filename}`); // eslint-disable-line @typescript-eslint/no-var-requires
      vcSchemesStorage.add(scheme);
    } catch (e) {
       logger.error(`Parse VC scheme error: ${e.message}`);
    }
  }

  return new VcSchemesClientService(vcSchemesStorage);
}
