import {Injectable} from "@nestjs/common";
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from "@nestjs/typeorm";
import { join } from 'path'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: '95.111.238.158',
            port: 3306,
            username: 'root',
            password: 'my-secret-pw',
            database: 'mailing',
            entities: [
                join(__dirname, '..', '..', '**', '*.entity{.ts,.js}')
            ],
            synchronize: true,
            insecureAuth : true
        };
    }
}
