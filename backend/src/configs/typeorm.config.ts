import { join } from 'node:path';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { envs } from 'src/shared/envs';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: envs.dbHost,
  port: envs.dbPort,
  username: envs.dbUsername,
  password: envs.dbPassword,
  database: envs.dbDatabase,
  synchronize: true,
  entities: [join(__dirname, '/../**/*.entity{.ts,.js}')],
};
