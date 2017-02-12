var express = require('express');
var logger = require('morgan');
var path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, 'public_html')));
app.use(logger('dev'));

module.exports = app;