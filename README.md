# node-examination

Building a RESTful CRUD API with Node.js(>=v10.15.0), Express/Koa and MongoDB/MySQL.

## Usage

```
// API documentation
$ git clone git@github.com:bridge5/node-examination.git
$ cd node-examination/swagger
$ npm start

$ open http://localhost:3030


// API server
$ cd node-examination/
$ npm install
$ node server.js

$ open http://localhost:3000


// MongoDB url
development: mongodb://localhost:27017/node-examination
test: mongodb://localhost:27017/node-examination-test
(defined in /config/database.config.js)


// API urls
[POST] http://localhost:3000/player
[GET] http://localhost:3000/players
[GET] http://localhost:3000/player/{playerId}
[PUT] http://localhost:3000/player
[DELETE] http://localhost:3000/player/{playerId}


// Run tests
$ cd node-examination/
$ npm install -g mocha
$ mocha
```

## Tasks

1. Please read the API documentation and implement the feature.
2. Please add tests using your preferred testing tool (chai, mocha, Jasmine ...).
3. Please add some features that could help you show your personal abilities.

## Objectives

- Please check for small things like syntax errors, since details matter.
- Please deliver something that works, non working project is an automatic disqualification.
