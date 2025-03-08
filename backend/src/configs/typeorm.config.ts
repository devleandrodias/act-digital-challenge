import { join } from 'node:path';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '172.20.48.1',
  port: 5432,
  username: 'brain_user',
  password: 'brain@2025',
  database: 'agriculture',
  synchronize: true,
  entities: [join(__dirname, '/../**/*.entity{.ts,.js}')],
};
