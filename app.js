var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
require('dotenv').config({'path':path.join(__dirname,'config/.env')})
const logger = require('./util/logger')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


console.log("log")
console.error("error")
console.info("info")

module.exports = app;
