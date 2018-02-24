'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('../config.json');
const db = require('./db/db.js');

db.setUpConnection();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser());
require('./routes/route.js')(app, express, db);

app.listen(config.serverPort, 'localhost', () => {
    console.log(`Server started on port ${config.serverPort}`);
})