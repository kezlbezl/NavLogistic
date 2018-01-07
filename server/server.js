'use strict'

const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, resp) => {
    resp.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
})
app.listen(7777, 'localhost', () => {
    console.log('Server started on port 7777');
})