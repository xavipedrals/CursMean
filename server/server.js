var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var mongoose = require('mongoose');
var models = require('./models');
var express_jwt = require('express-jwt');
var config = require('./config');
var cors = require('cors');

//Mongoose connect to database.
mongoose.connect(config.db_path);

//Initialize models
models.initialize();

var app = express();

app.use(bodyParser.json());

//Import the router of users
var userRouter = require('./routes/user');
var authRouter = require('./routes/authentication');
var agendaRouter = require('./routes/agenda');
var contactRouter = require('./routes/contact');
app.use(cors());
app.use('/user',  userRouter);
app.use('/authenticate', authRouter);
app.use('/agenda', agendaRouter);
app.use('/contact', contactRouter);


http.createServer(app).listen(8080);