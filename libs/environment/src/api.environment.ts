import { get } from 'env-var';
import { COMMON_ENV } from './common.environment';

export const API_ENV = () => ({
  ...COMMON_ENV,
  DB_URI: get('NX_DB_URI').required().asUrlString(),
  MQTT_URI: get('NX_MQTT_URI').required().asUrlString(),
  CORS_ORIGINS: get('NX_API_CORS_ORIGINS').required(),
  JWT_SECRET: get('NX_JWT_SECRET').required().asString(),
  JWT_EXPIRE: get('NX_JWT_EXPIRE').required().asString(),
  TTL_CACHE: get('NX_TTL_CACHE').required().asString(),
});
