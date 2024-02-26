import { Module } from '@nestjs/common';
import { PlayerHandlerService } from './services/player.handler.service';
import { PlayerController } from './controllers/player.controller';
import { QueryPlayerService } from './services/queryPlayer.service';
import { UpdatePlayerService } from './services/updatePlayer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerSchema } from './schema/player.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'player', schema: PlayerSchema }]),
  ],
  controllers: [PlayerController],
  providers: [PlayerHandlerService, QueryPlayerService, UpdatePlayerService],
})
export class PlayerModule {}
