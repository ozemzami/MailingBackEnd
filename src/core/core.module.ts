import {Global, Module} from '@nestjs/common';
import {TypeOrmConfigService} from "./database/type-orm-config.service";
import {TypeOrmModule} from "@nestjs/typeorm";

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
        imports: [],
        useClass: TypeOrmConfigService,
    })
    ],
    providers: [],
    exports: [],
})
export class CoreModule {}
