class PlayerAPIs {
  // Demo
  async demoAPI(ctx) {
    try {
      const resData = {
        message: 'Building a RESTful CRUD API with Node.js, Express/Koa and MongoDB.',
      };
      return ctx.JSONRes(resData);
    } catch (err) {
        console.error(err.stack)
      return ctx.JSONError(err.message);
    }
  }

  async playerMiddleWare(player_id, ctx, next) {
    try {
      ctx.checkParams('player_id').notEmpty('球员id不能为空');
      if (ctx.errors) {
        return ctx.JSONError(ctx.errors);
      }
      const playerObj = await ctx.app.mongoDBModels.Players
        .findOne({
          _id: player_id,
        });
      if (!playerObj) {
        return ctx.JSONError('球员不存在');
      }
      ctx.playerObj = playerObj;
      return next();
    } catch (err) {
      ctx.app.logger.error(err.stack);
      return ctx.JSONError(err.message);
    }
  }


  // addPlayer
  async addPlayer(ctx) {
    try {
      ctx.checkBody('name').notEmpty('请输入球员名称');
      ctx.checkBody('position').notEmpty('请输入球员位置');
      if (ctx.errors) {
        return ctx.JSONError(ctx.errors);
      }
      const playerObj = ctx.request.body;
      await ctx.app.mongoDBModels.Players.addNew(playerObj);
      
      return ctx.JSONRes({ add_player: 'ok' });
    } catch (err) {
      ctx.app.logger.error(err.stack);
      return ctx.JSONError(err.message);
    }
  }

  // playerActionAPI
  async playerActionAPI(ctx) {
    try {
      ctx.checkParams('action_type', '请输入操作类型').notEmpty();
      if (ctx.params.action_type === 'update') {
        ctx.checkBody('name').notEmpty('必须输入球员姓名');
        ctx.checkBody('position').notEmpty('必须输入球员位置');
      } else if (ctx.params.action_type === 'delete') {
      
      }
      if (ctx.errors) {
        return ctx.JSONError(ctx.errors);
      }
      let resData = {};
      if (ctx.params.action_type === 'update') {
        const playerDate = ctx.request.body;
        await ctx.playerObj.update(playerDate);
        resData = { update_player: 'ok' };
      } else if (ctx.params.action_type === 'delete') {
        await ctx.playerObj.delete();
        resData = { delete_player: 'ok' };
      }
      return ctx.JSONRes(resData);
    } catch (err) {
      ctx.app.logger.error(err.stack);
      return ctx.JSONError(err.message);
    }
  }

  // getPlayerById
  async getPlayerById(ctx) {
    try {
      const res = {
        id: ctx.playerObj._id,
        name: ctx.playerObj.name,
        age: ctx.playerObj.age,
      };
      return ctx.JSONRes(res);
    } catch (err) {
      ctx.app.logger.error(err.stack);
      return ctx.JSONError(err.message);
    }
  }

}

module.exports = new PlayerAPIs();
