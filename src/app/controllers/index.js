let Promise = require('bluebird');
let Joi     = require('joi');

let JoiValidatePromise = Promise.promisify(Joi.validate);
let Player             = require('../schemas/player');
const CONSTANTS        = require('../constants');

let paramSchema = Joi.object().keys({
  id: Joi.number().integer().min(0).required(),
  name: Joi.string().required(),
  position: Joi.string().only(CONSTANTS.positionENUM).required(),
});

let KoaRouter = require('koa-router');
let router    = new KoaRouter({prefix: '/v1',});

{

  router.get('/', async (ctx) => {
    ctx.status = 200;
    ctx.body   = 'It Works!';
  });

  router.post('/player', async (ctx) => {
    let params;
    try {
      params = await JoiValidatePromise(ctx.request.body, paramSchema);
    } catch (e) {
      ctx.body = {
        code: 405,
      };
      return;
    }
    let doc;
    try {
      doc = await Player.create({...params});
    } catch (e) {
      ctx.body = {
        code: 400,
      };
      return;
    }

    ctx.body = {
      code: 0,
      data: doc.toObject(),
    };
  });

  // cacheable
  router.get('/player/:id', async (ctx) => {
    let j = Joi.number().integer().min(0).validate(ctx.params.id);
    if (j.error) {
      ctx.body = {
        code: 400,
      };
      return;
    }
    let id        = j.value;
    let playerDoc = await Player.findOne({id})
    .readConcern('local')
    .exec();

    if (!playerDoc) {
      ctx.body = {
        code: 404,
      };
      return;
    }
    ctx.body = {
      code: 200,
      data: playerDoc.toObject(),
    };
  });

  router.put('/player', async (ctx) => {
    let params;
    try {
      params = await JoiValidatePromise(ctx.request.body, paramSchema);
    } catch (e) {
      // include code 400?
      ctx.body = {
        code: 405,
      };
      return;
    }
    //update by id
    let doc = await Player.findOneAndUpdate({id: params.id}, {...params},)
    .readConcern('local')
    .exec();

    if (!doc) {
      ctx.body = {
        code: 404,
      };
      return;
    }

    ctx.body = {
      code: 0,
      data: doc.toObject(),
    };
  });

  router.delete('/player/:id', async (ctx) => {
    let j = Joi.number().integer().min(0).validate(ctx.params.id);
    if (j.error) {
      ctx.body = {
        code: 400,
      };
      return;
    }
    let id     = j.value;
    let result = await Player.remove({id}).exec();

    if (!result.deletedCount) {
      ctx.body = {
        code: 404,
      };
      return;
    }
    ctx.body = {
      code: 0,
    };
  });

}

module.exports = router.routes();
