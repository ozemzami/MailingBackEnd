import {Global, Module} from '@nestjs/common';
import {TypeOrmConfigService} from "./database/type-orm-config.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
        imports: [],
        useClass: TypeOrmConfigService,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..',  'public'),
            exclude: ['/api*'],

        })
    ],
    providers: [],
    exports: [],
})
export class CoreModule {}
