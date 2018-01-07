'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db/db.js');

db.setUpConnection();
const app = express();

app.use(bodyParser.json());
app.get('/', (req, resp) => {
    resp.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
})
app.get('/accounts', (req, resp) => {
    db.getAccountList()
        .then(data => resp.send(data));
})
app.post('/accounts', (req, resp) => {
    db.createAccount(req.body)
        .then(data => resp.send(data));
})
app.delete('/accounts/:id', (req, resp) => {
    db.deleteAccount(req.params.id)
        .then(data => resp.send(data));
})

app.listen(7777, 'localhost', () => {
    console.log('Server started on port 7777');
})