import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { ModelBaseService } from '../../../models/base.service';
import { PlayerDto } from '../schema/player.schema';

@Injectable()
export class QueryPlayerService extends ModelBaseService<PlayerDto> {
  constructor(
    @InjectModel('player')
    model: Model<PlayerDto>,
  ) {
    super(model);
  }
}
