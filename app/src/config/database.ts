

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default {
    name: 'mongo',
    type: 'mongodb',
    host: '127.0.0.1',
    authSource: 'admin',
    database: 'test',      // 注意需要在本地创建test集合
    synchronize: true,
    useUnifiedTopology: true,
} as TypeOrmModuleOptions;

