import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DbConfigInterface } from "config/config.interface";
import * as config from 'config';

const dbSettings: DbConfigInterface = config.get('db');

export const typeOrmSettings: TypeOrmModuleOptions = {
    type: dbSettings.type,
    host: dbSettings.host,
    port: dbSettings.port,
    username: dbSettings.username,
    password: dbSettings.password,
    database: dbSettings.database,
    entities: [__dirname + '/../**/*.entity.js'],
    synchronize: dbSettings.synchronize,
    logging: dbSettings.logging,
}
