const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret' //insert own difficult password
};
passport.use(new Strategy(opts, function(jwt_payload, done) {
    if (jwt_payload != void(0)) return done(false, jwt_payload);
    done();
}));

module.exports = {
    checkAuth(req, resp, next) {
        passport.authenticate('jwt', { session: false }, (err, decryptToken, jwtError) => {
            if (jwtError != void(0) || err != void(0)) {
                return resp.send(jwtError.toString());
            }
            resp.user = decryptToken;
            next();
        })(req, resp, next);
    }
}