'use strict';

const bodyParser = require('body-parser');
const api = require("./api");

module.exports = app => {
	// 设置 JSON 解析
	app.use(bodyParser.json());
	// 设置 URL 解析
	app.use(bodyParser.urlencoded({ extended: true }));
	// 设置全局异常捕获
	app.use(function(err, req, res, next){
		console.error(err.stack);
		res.status(500).send({
			message:"System Error"
		});
	})
	// 设置路由
	app.use("/api", api)
}
