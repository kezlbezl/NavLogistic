'use strict'

const express = require('express');
const app = express();

app.get('/', (req, resp) => {
    resp.send('TEST RESPONSE');
})
app.listen(7777, 'localhost', () => {
    console.log('Server started on port 7777');
})