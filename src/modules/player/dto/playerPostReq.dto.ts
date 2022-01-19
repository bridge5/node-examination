import { PickType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { PlayerDto } from '../schema/player.schema';

@Exclude()
export class PlayerPostReqDto extends PickType(PlayerDto, [
  'name',
  'position',
]) {}
