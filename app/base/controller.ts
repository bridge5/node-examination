

import { Request, Response } from 'express';
import { join } from 'path';
import { readdirSync } from 'fs';
import { camelCase, upperFirst } from 'lodash';
import { CustomSequelize, sequelize } from '../model';
import IRegisterService from '../service';


export interface IContext {
  request: Request;
  response: Response;
  model: CustomSequelize;
  service: IRegisterService;
}


export default class BaseController {
  public ctx: IContext;

  constructor(req: Request, res: Response) {
    const context = {
      request: req,
      response: res,
      model: sequelize.models as any,
    };
    let service = {} as any;
    const path = join(__dirname, '../service');
    const serviceFiles = readdirSync(path).filter(x => x !== 'index.js').filter(x => x !== 'index.ts');
    serviceFiles.map(fileName => {
      const name = upperFirst(camelCase(fileName.split('.')[0] + 'Service'));
      const cotr = require(join(path, fileName)).default;
      service = {
        ...service,
        get [name]() {
          return new cotr(context);
        }
      }
    });

    this.ctx = {
      ...context,
      service,
    };
  }

  success(data: any, msg?: string) {
    const body = {
      errcode: 0,
      msg: msg || 'success',
      retcode: 0,
      data,
    };
    this.ctx.response.setHeader('Content-Type', 'application/json');
    this.ctx.response.send(body);
    return;
  }

  error(
    errcode: number,
    retcode: number,
    msg: Error,
    data?: any,
  ) {
    const body = {
      errcode, msg, retcode, data,
    };
    this.ctx.response.send(body);
  }

  get request() {
    return this.ctx.request;
  }

  get response() {
    return this.ctx.response;
  }
}
