

import {
  Global, Module,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlayerModel } from './domain/player';
import mongoConfig from './config/database';
import { PlayerEntity } from './domain/player/repository';


const moduleList = [
  PlayerModel,
]
@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...mongoConfig as any,
      entities: [
        PlayerEntity,
      ],
    }),
    ...moduleList,
  ],
  providers: [],
  exports: moduleList,
})
export class AppModule { }
