/**
 * 原计划用于test的http请求。目前暂未使用
 */
import { request } from 'http';
import { equal } from 'assert';


interface IResult {
  errcode: number;
  msg: string;
  retcode: number;
  data: any;
}

class HttpTest {
  private config = {
    host: '127.0.0.1',
    // port: process.env.SERVER_PORT,
    port: 3000,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': 0,
    }
  };
  private url: string;
  private data: string | object | undefined;
  private result: IResult;
  private statusCode: number | undefined;

  static httpRequest() {
    return new HttpTest();
  }

  post(url: string) {
    this.url = url;
    this.config.method = 'POST';
    return this;
  }
  get(url: string) {
    this.url = url;
    this.config.method = 'GET';
    return this;
  }
  put(url: string) {
    this.url = url;
    this.config.method = 'PUT';
    return this;
  };
  delete(url: string) {
    this.url = url;
    this.config.method = 'DELETE';
    return this;
  };
  send(data?: string | object | undefined) {
    this.data = data;
    return this;
  }
  expect(param: number | ((result: IResult) => void)) {
    let data = '';
    if (!this.statusCode) {
      new Promise(resolve => {

      }).then();
      const dataStr = JSON.stringify(this.data);
      this.data && (this.config.headers['Content-Length'] = dataStr.length);
      const req = request(this.config, res => {
        this.statusCode = res.statusCode!;
        res.setEncoding('utf8');
        res.on('data', d => {
          data += d;
        });
        res.on('end', () => {
          this.result = JSON.parse(data);
          if (typeof param === 'number') {
            equal(this.statusCode, param);
          } else {
            param(this.result);
          }
        });
      });
      req.on('error', e => console.error(e));
      req.write(dataStr);
      req.end();
    } else if (typeof param === 'number') {
      equal(this.statusCode, param);
    } else {
      param(this.result);
    }
    return this;
  }
}

export default HttpTest;
