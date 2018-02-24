'use_strict';

const auth = require('./../authentication/authentication.js');
const path = require('path');
const bcrypt = require('bcryptjs');

module.exports = (app, express, db) => {
    app.use('/public', express.static('./client/public'));

    app.get('/', auth.checkAuth, (req, resp) => {
        resp.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
    });
    app.post('/login', (req, resp) => {
        db.findAccountByProperty(req.body.login)
            .then(match => {
                if (match.length > 0 || bcrypt.compareSync(req.body.password, match[0].password)) {
                    const token = auth.createToken({ id: match[0]._id, login: match[0].login });
                    console.warn(token);
                    resp.cookie('token', token, {
                        httpOnly: true
                    })
                    return resp.status(200).send(`User login success`);
                } else {
                    console.log(`User does not exist or password incorrect`);
                    resp.status(400).send(`User does not exist or password incorrect`);
                }
            })
            .catch(error => {
                console.log(`Login error ${error}`);
                resp.status(500).send(error.toString());
            })
    });
    app.post('/logout', (req, resp) => {
        resp.clearCookie('token');
        return resp.status(200).send(`User logout success`);
    })
    app.get('/accounts', (req, resp) => {
        db.getAccountList()
            .then(data => resp.send(data));
    });
    app.post('/accounts', (req, resp) => {
        db.createAccount(req.body)
            .then(data => {
                console.warn(data.token);
                resp.cookie('token', data.token, {
                    httpOnly: true
                })
                return resp.status(200).send(data.newAccount);
            })
            .catch(error => {
                console.log(`createAccount ${error}`);
                resp.status(400).send(error.toString());
            });
    });
    app.delete('/accounts/:id', (req, resp) => {
        db.deleteAccount(req.params.id)
            .then(data => resp.send(data));
    });
}