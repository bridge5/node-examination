

import { Module, Provider } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlayerController } from "./controller";
import { AbcPlayerQueryRepo, AbcPlayerSaveRepo } from "./interface/repository";
import { PlayerEntity } from "./repository";
import {
    PlayerQueryRepo, PlayerRepository,
    PlayerSaveRepo,
} from "./repository/player";


const providers: Provider<any>[] = [
    { provide: AbcPlayerQueryRepo, useClass: PlayerQueryRepo },
    { provide: AbcPlayerSaveRepo, useClass: PlayerSaveRepo }
];
@Module({
    imports: [
        TypeOrmModule.forFeature(
            [PlayerEntity, PlayerRepository],
            'mongo',
        ),
    ],
    controllers: [
        PlayerController,
    ],
    providers,
    exports: providers,
})
export class PlayerModel { }
