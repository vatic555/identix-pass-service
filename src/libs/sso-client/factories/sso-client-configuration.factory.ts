import { registerAs } from '@nestjs/config';

import { SSOClientConfiguration } from '../types';

export default registerAs('sso-client-configuration', (): SSOClientConfiguration => ({
  clientToken: process.env.SSO_CLIENT_TOKEN,
  ssoGraphqlApiUrl: process.env.SSO_GRAPHQL_API_URL
}));
