import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Delete,
  Response,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlayerHandlerService } from '../services/player.handler.service';
import { PlayerPostReqDto } from '../dto/playerPostReq.dto';
import { PlayerPutReqDto } from '../dto/playerPutReq.dto';
import { PlayerDto } from '../schema/player.schema';
import { TransformResponseInterceptor } from '../../../middlewares/transformResponse.interceptor';
import { PlayerIdParamDto } from '../../../dto/playerIdParam.dto';
import { create } from 'xmlbuilder2';
import * as _ from 'lodash';

@ApiTags('Player')
@Controller('player')
export class PlayerController {
  constructor(private readonly playerHandlerService: PlayerHandlerService) {}

  @Get(':playerId')
  @ApiOperation({
    summary: 'getPlayerById',
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async getPlayerById(
    @Param() { playerId }: PlayerIdParamDto,
    @Response() res,
  ): Promise<any> {
    const player = await this.playerHandlerService.queryPlayerById(playerId);
    res.set('Content-Type', 'text/xml');
    res.send(
      create({
        Player: {
          id: _.get(player, '_id'),
          name: player?.name,
          position: player?.position,
        },
      }).end({ prettyPrint: true, format: 'xml' }),
    );
  }

  @Post()
  @UseInterceptors(TransformResponseInterceptor)
  @ApiOperation({
    summary: 'PostPlayer',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: PlayerDto,
  })
  async postPlayer(@Body() body: PlayerPostReqDto): Promise<PlayerDto> {
    return await this.playerHandlerService.createPlayer(body);
  }

  @Put()
  @ApiOperation({
    summary: 'PutPlayer',
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async putPlayer(@Body() body: PlayerPutReqDto): Promise<void> {
    return await this.playerHandlerService.updatePlayer(body);
  }

  @Delete(':playerId')
  @ApiOperation({
    summary: 'DeletePlayerById',
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async deletePlayerById(
    @Param() { playerId }: PlayerIdParamDto,
  ): Promise<void> {
    await this.playerHandlerService.deletePlayerById(playerId);
  }
}
