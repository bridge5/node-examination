/*
 * index controller
 */
'use strict';

class Index {
    async index(req, res, next) {
        res.json({"message": "Building a RESTful CRUD API with Node.js, Express/Koa and MongoDB."});
    }   
}

module.exports = new Index();