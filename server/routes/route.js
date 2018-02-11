'use_strict';

const auth = require('./../authentication/authentication.js');
const path = require('path');

module.exports = (app, express) => {
    app.use('/public', express.static('./client/public'));

    app.get('/', auth.checkAuth, (req, resp) => {
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
}