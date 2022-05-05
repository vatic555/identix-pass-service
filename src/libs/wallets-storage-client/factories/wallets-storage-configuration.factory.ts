import { registerAs } from '@nestjs/config';

import { WalletsStorageConfiguration } from '../types';

export default registerAs('wallets-storage-configuration', (): WalletsStorageConfiguration => ({
  walletsStorageUrl: process.env.WALLETS_STORAGE_API_URL,
  walletsApiToken: process.env.WALLETS_API_TOKEN
}));
