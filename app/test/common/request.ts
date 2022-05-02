

import { Express } from 'express';
import request, { CallbackHandler } from "supertest";


const supRequest = (app: Express) => {
  const superRequest = request(app);
  const baseGet: Function = superRequest.get;
  const basePost: Function = superRequest.post;
  const basePut: Function = superRequest.put;
  const baseDelete: Function = superRequest.delete;
  superRequest.get = function (url: string, callback?: CallbackHandler | undefined) {
    return baseGet.apply(superRequest, [url, callback]).set('Accept', 'application/json');
  }
  superRequest.post = function (url: string, callback?: CallbackHandler | undefined) {
    return basePost.apply(superRequest, [url, callback]).set('Accept', 'application/json');
  }
  superRequest.put = function (url: string, callback?: CallbackHandler | undefined) {
    return basePut.apply(superRequest, [url, callback]).set('Accept', 'application/json');
  }
  superRequest.delete = function (url: string, callback?: CallbackHandler | undefined) {
    return baseDelete.apply(superRequest, [url, callback]).set('Accept', 'application/json');
  }
  return superRequest;
}

export default supRequest;

