const mongoose = require('mongoose');
process.env.NODE_ENV === 'test' ? mongoose.connect('mongodb://localhost/testAppTest') : mongoose.connect('mongodb://localhost/testApp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = mongoose;