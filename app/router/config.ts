/**
 * 路由配置文件 注意：请勿删除全大写注释。
 * 一般情况下保持restful风格的接口规范。但特殊情况仍然支持自定义形式。如上传文件等方案
 */
 export default {
  controller: {
    '/api/test/player': {
      path: '/api/player/test',
      method: 'get',
    }
  },
  restful: {
    // RESTFUL
    '/api/player': {
      name: 'Player',
      path: '/api/player'
    },
  }
}
