const express = require('express');
const router = require("./routes/index");
const app = express();

// 设置跨域访问
app.all('*', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, token");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", 'Express');
	if (req.method == 'OPTIONS') {
		res.sendStatus(200);
	} else {
		next();
	}
});

app.get('/', (req, res) => {
    res.json({"message": "Building a RESTful CRUD API with Node.js, Express/Koa and MongoDB."});
});

// 连接数据库
require("./db");
// 设置路由
router(app);
// 启动服务
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});