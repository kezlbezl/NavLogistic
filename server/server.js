'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('../config.json');
const db = require('./db/db.js');

db.setUpConnection();

require('./routes/route.js')(app, express);

app.use(bodyParser.json());
app.listen(config.serverPort, 'localhost', () => {
    console.log(`Server started on port ${config.serverPort}`);
})