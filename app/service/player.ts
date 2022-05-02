import BaseService from "../base/server";


export default class PlayerService extends BaseService {

  get model() {
    return this.ctx.model.Player;
  }

  publicAll() {
    return this.model.findAll();
  }

  fetchOne(id: number) {
    return this.model.findByPk(id);
  }

  // 暂不过多做数据验证。设计框架花费了大量时间
  create(obj: Record<string, any>) {
    return this.model.create(obj);
  }

  // 暂不过多做数据验证。
  modify(id: number, obj: Record<string, any>) {
    return this.model.update(obj, {
      where: {
        id,
      },
    });
  }

  // 根据情况可做软删除。这里直接删
  delete(id: number) {
    return this.model.destroy({
      where: {
        id,
      },
    });
  }
}
