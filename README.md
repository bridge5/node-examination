## Tasks

1. Please read the swagger documentation and implement these features under app folder.
2. Please add tests using your preferred testing tool (chai, mocha, Jasmine ...).
3. Please add some features that could help you show your personal abilities.


### My Node CURD Project

input `cd app`，

Install dependencies: `npm i`

The application start command: `npm run start` 

The application test command:`npm run test`

The directory structure is as follows

```
├── config  
│   ├── config.development.js
│   ├── config.prod.js
│   ├── config.test.js
│   ├── error.map.js
│   └── index.js
├── controller
│   ├── index.js
│   └── player.js
├── lib
│   ├── mongoose.js
│   └── util.js
├── middleware
│   └── errorHandle.js
├── model
│   └── player.js
├── package-lock.json
├── package.json
├── router
│   ├── index.js
│   └── player.js
├── router.js
├── server.js
├── service
│   ├── base.js
│   └── player.js
└── test
    └── player.test.js
```