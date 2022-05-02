

import { Op } from 'sequelize';
import { expect } from 'chai';
import supRequest from '../../common/request';
import { app } from '../../../app';
import initORM from '../../../model';


describe.only('test/controller/api/player.test.ts', () => {

  let model: any;

  before(async () => {
    const mapModel = await initORM();
    model = mapModel['Player'] as any;
  })

  beforeEach(async () => {
    // 清除测试数据库中数据，防止数据影响测试脚本
    await model.destroy({ where: { id: { [Op.gt]: 0 } } });
  });

  it('should GET /api/test/player', () => {
    return supRequest(app)
      .get('/api/test/player')
      .expect(200)
      .then(res => {
        expect(res.body.data).to.equal('result test');
      });
  });

  it('shold GET /api/player', async () => {
    const entity = await model.create({ name: 'unittest', position: 'SG' });
    return supRequest(app)
      .get('/api/player')
      .expect(200)
      .then(res => {
        expect(res.body.data.length).to.equal(1);
      });
  });

  it('shold GET /api/player/:id', async () => {
    const entity = await model.create({ name: 'unittest', position: 'SG' });
    return supRequest(app)
      .get(`/api/player/${entity.id}`)
      .expect(200)
      .then(res => {
        expect(res.body.data.id).to.equal(entity.id);
      });
  });

  it('shold POST /api/player', async () => {
    const body = { name: 'postName', position: 'SG' };
    return supRequest(app)
      .post('/api/player')
      .send(body)
      .expect(200)
      .then(res => {
        expect(res.body.data.name).to.equal('postName');
      });
  });

  it('shold DELETE /api/player', async () => {
    const entity = await model.create({ name: 'unittest', position: 'SG' });
    return supRequest(app)
      .delete(`/api/player/${entity.id}`)
      .expect(200)
      .then(res => {
        expect(res.body.data).to.equal(1);
      });
  });

  it('shold PUT /api/player', async () => {
    const entity = await model.create({ name: 'unittest', position: 'SG' });
    return supRequest(app)
      .put(`/api/player/${entity.id}`)
      .send({
        name: 'updateName',
      })
      .expect(200)
      .then(res => {
        expect(res.body).to.deep.equals({
          errcode: 0,
          msg: 'success',
          retcode: 0,
          data: '修改成功',
        });
      });
  });

});
