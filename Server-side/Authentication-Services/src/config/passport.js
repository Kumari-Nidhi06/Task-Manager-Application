const Users = require('../models/user.model');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
    passport.use(new localStrategy(
        { usernameField: 'email', password: 'password' },
        async (email, password, done) => {
            const user = await Users.findOne({ email: email })
            console.log("user from passport:", user);
            if (!user) { return done(null, false, { message: 'User not found.' }); }
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user, { message: 'Authentication Successful' });
            }
            return done({
                message: 'Invalid password'
            },false 
            );
        }
    ));
    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    })

    passport.deserializeUser((id, cb) => {
        Users.findOne({ _id: id }).then(user => cb(null, user)).catch(e => cb(e, null));
    })
}