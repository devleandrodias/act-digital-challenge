import 'dotenv/config';

import * as env from 'env-var';

export const envs = {
  dbHost: env.get('DB_HOST').required().asString(),
  dbPort: env.get('DB_PORT').required().asIntPositive(),
  dbUsername: env.get('DB_USERNAME').required().asString(),
  dbPassword: env.get('DB_PASSWORD').required().asString(),
  dbDatabase: env.get('DB_DATABASE').required().asString(),
};
