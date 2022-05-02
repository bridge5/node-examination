const app = require('../app'); // 引入koa

/*
* 登录中间件
* */
app.use(require('./../src/middleware/auth'))


const www = require('../src/router/www')
app.use(www.routes()).use(www.allowedMethods());

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
