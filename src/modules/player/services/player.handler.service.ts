import { Injectable } from '@nestjs/common';
import { PlayerPostReqDto } from '../dto/playerPostReq.dto';
import { QueryPlayerService } from './queryPlayer.service';
import { UpdatePlayerService } from './updatePlayer.service';
import { PLAYER_STATUS, PlayerDto } from '../schema/player.schema';
import { PlayerPutReqDto } from '../dto/playerPutReq.dto';
import * as _ from 'lodash';
import { NotFoundErrorException } from '../../../exceptions/notFoundError.exception';

@Injectable()
export class PlayerHandlerService {
  constructor(
    private readonly updatePlayerService: UpdatePlayerService,
    private readonly queryPlayerService: QueryPlayerService,
  ) {}

  async createPlayer(data: PlayerPostReqDto): Promise<PlayerDto> {
    return this.updatePlayerService.create({
      docs: data,
    });
  }

  async updatePlayer({ id, ...update }: PlayerPutReqDto): Promise<void> {
    const player = await this.queryPlayerService.findOne({
      filter: {
        _id: id,
        status: PLAYER_STATUS.published,
      },
    });
    if (_.isEmpty(player)) throw new NotFoundErrorException('player not fount');
    await this.updatePlayerService.update({
      conditions: { _id: id },
      update,
    });
  }

  async queryPlayerById(playerId: string): Promise<PlayerDto> {
    const player = await this.queryPlayerService.findOne({
      filter: {
        _id: playerId,
        status: PLAYER_STATUS.published,
      },
    });
    if (_.isEmpty(player)) throw new NotFoundErrorException('player not fount');
    return player;
  }

  async deletePlayerById(playerId: string): Promise<void> {
    const player = await this.queryPlayerService.findOne({
      filter: {
        _id: playerId,
        status: PLAYER_STATUS.published,
      },
    });
    if (_.isEmpty(player)) throw new NotFoundErrorException('player not fount');
    await this.updatePlayerService.update({
      conditions: { _id: playerId },
      update: { status: PLAYER_STATUS.delete },
    });
  }
}
