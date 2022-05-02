

import express, { Request, Response, Express } from 'express';
import { map } from 'lodash';
import routeConf from './config';
import { mapObjIndexed } from '../tools/pureFunc';



const { restful, controller } = routeConf;

const getHandleFunc = (path: string, action: string) => {
  const Constr = require('../controller' + path).default;
  const handleFactory = (action: string) => (req: Request, res: Response) => {
    const ctorObj = new Constr(req, res);
    ctorObj[action]();
  };
  return handleFactory(action);
}

const initRouters = (app: Express) => {
  mapObjIndexed((v, k) => {
    const idUrl = k + '/:id';
    app.get(k, getHandleFunc(v.path, 'index'));
    app.post(k, getHandleFunc(v.path, 'create'));
    app.get(idUrl, getHandleFunc(v.path, 'show'));
    app.put(idUrl, getHandleFunc(v.path, 'update'));
    app.delete(idUrl, getHandleFunc(v.path, 'destroy'));
  }, restful);
  mapObjIndexed((v, k) => {
    const paths = v.path.split('/');
    const action = paths.pop()!;
    const path = paths.join('/');
    (app as any)[v.method](k, getHandleFunc(path, action));
  }, controller);
}

export default initRouters;
