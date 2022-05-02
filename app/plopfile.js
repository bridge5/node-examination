

const upperFirst = require('lodash').upperFirst;


module.exports = (plop) => {
  plop.setHelper('upperFirst', (x) => {
    return upperFirst(x);
  });
  plop.setGenerator('create:service', {
    description: '创建一个服务',
    prompts: [
      {
        type: 'input',
        name: 'service_name',
        message: '请输入创建的服务名:',
      }
    ],
    actions: [
      {
        type: 'add',
        path: './service/{{service_name}}.ts',
        templateFile: './cli/service.ts.hbs',
      },
      {
        path: './service/index.ts',
        pattern: /(\/\/ SERVICE_INPUT)/g,
        template: 'import {{upperFirst service_name}}Service from \'./{{service_name}}\';\n$1',
        type: 'modify',
      },
      {
        path: './service/index.ts',
        pattern: /(\/\/ SERVICE_REGISTER)/g,
        template: '{{upperFirst service_name}}Service: {{upperFirst service_name}}Service;\n  $1',
        type: 'modify'
      }
    ]
  });

  plop.setGenerator('create:api-controller', {
    prompts: [
      {
        type: 'input',
        name: 'controller_name',
        message: '请输入创建的控制名:',
      }
    ],
    actions: [
      {
        type: 'add',
        path: './controller/api/{{controller_name}}.ts',
        templateFile: './cli/controller.ts.hbs',
      },
      {
        path: './router/config.ts',
        pattern: /(\/\/ RESTFUL)/g,
        templateFile: './cli/route-config.hbs',
        type: 'modify',
      },
    ]
  });
}
