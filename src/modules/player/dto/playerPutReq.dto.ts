import { PickType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { PlayerDto } from '../schema/player.schema';

@Exclude()
export class PlayerPutReqDto extends PickType(PlayerDto, [
  'id',
  'name',
  'position',
]) {}
