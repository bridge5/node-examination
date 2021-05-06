const validateSchema = require('validate');
const fs = require('fs')
const path = require('path')

module.exports = {
    /*
  * 参数验证
  * */
    validate(schema, data) {
        let validate = new validateSchema(schema);
        let errors = validate.validate(data);
        if (!errors.length) {
            return {err: 0, msg: 'success'};
        }
        errors = errors.map(val => {
            return {
                name: val.path,
                message: val.message,
            };
        });

        return {message: errors[0].message, errors};
    },

    //遍历目录下的所有文件
    getAllFile(dir) {
        let res = []

        function traverse(dir) {
            fs.readdirSync(dir).forEach((file) => {
                const pathname = path.join(dir, file)
                if (fs.statSync(pathname).isDirectory()) {
                    traverse(pathname)
                } else {
                    res.push(pathname)
                }
            })
        }

        traverse(dir)
        return res;
    },

    //中间件命名设置
    setMiddlewareName(app, dir) {
        function traverse(dir) {
            fs.readdirSync(dir).forEach((file) => {
                let pathname = path.join(dir, file)
                if (fs.statSync(pathname).isDirectory()) {
                    traverse(pathname)
                } else {
                    let key = file.replace('.js','');
                    app.context['$'+key] = require(pathname)
                }
            })
        }
        traverse(dir)
    }
}
