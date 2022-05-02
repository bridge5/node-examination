

import { IContext } from './controller';

export default class BaseService {
  constructor(
    public ctx: Omit<IContext, 'service'>,
  ) { }
}
