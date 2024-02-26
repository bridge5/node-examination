import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsMongoId } from 'class-validator';

export const playerIdParamValidExample = {
  playerId: '5b8ea08eb0b2b900dcb8be53',
};

@Exclude()
export class PlayerIdParamDto {
  @Expose()
  @IsMongoId()
  @ApiProperty({
    example: playerIdParamValidExample.playerId,
  })
  readonly playerId: string;
}
