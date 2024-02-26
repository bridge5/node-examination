import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { BasicFields } from './base.schema';
import { Exclude, Expose } from 'class-transformer';
import { IsIn, IsMongoId, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  getEnumNonNumericValues,
  getEnumNumericValues,
} from '../../../utils/enum.util';
import { ConvertFromId } from '../../../decorators/dto/convertFromId.dto.decorator';

export enum PLAYER_POSITION {
  C = 'C',
  PF = 'PF',
  SF = 'SF',
  PG = 'PG',
  SG = 'SG',
}

export enum PLAYER_STATUS {
  delete,
  published,
}

export const playerValidExample = {
  _id: '61cc1f3a428d36921fdcf8d2',
  id: '61cc1f3a428d36921fdcf8d2',
  name: 'name',
  position: PLAYER_POSITION.C,
  status: PLAYER_STATUS.published,
};

@Exclude()
@Schema({
  timestamps: { createdAt: 'createdTime', updatedAt: 'updatedTime' },
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
  id: false,
  collection: 'player',
})
export class PlayerDto extends BasicFields {
  @Expose()
  @ConvertFromId()
  @IsMongoId()
  @ApiProperty({
    example: playerValidExample.id,
    description: 'player id',
  })
  readonly id: string;

  @Expose()
  @IsString()
  @ApiProperty({
    description: '名称',
    example: playerValidExample.name,
  })
  @Prop({ type: String, required: true })
  name: string;

  @Expose()
  @IsOptional()
  @IsIn(getEnumNonNumericValues(PLAYER_POSITION))
  @ApiProperty({
    required: false,
    default: PLAYER_POSITION.C,
    description: 'player position in the team',
    enum: getEnumNonNumericValues(PLAYER_POSITION),
  })
  @Prop({
    type: String,
    enum: getEnumNonNumericValues(PLAYER_POSITION),
    default: PLAYER_POSITION.C,
  })
  position?: PLAYER_POSITION;

  @Expose()
  @IsOptional()
  @IsIn(getEnumNumericValues(PLAYER_STATUS))
  @ApiProperty({
    example: playerValidExample.status,
    required: false,
    enum: getEnumNumericValues(PLAYER_STATUS),
  })
  @Prop({
    type: Number,
    enum: getEnumNumericValues(PLAYER_STATUS),
    default: PLAYER_STATUS.published,
  })
  status?: PLAYER_STATUS;
}

const PlayerSchema = SchemaFactory.createForClass(PlayerDto);
PlayerSchema.plugin(mongooseLeanVirtuals);

export { PlayerSchema };
