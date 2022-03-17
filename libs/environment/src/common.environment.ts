import { get } from 'env-var';

export const COMMON_ENV = {
  ENV: get('NODE_ENV').required().asString(),
  IS_PRODUCTION: get('NODE_ENV').required().asString() === 'production',
  API_PORT: get('NX_API_PORT').required().asPortNumber(),
  API_HOST: get('NX_API_HOST').required().asUrlString(),
};
