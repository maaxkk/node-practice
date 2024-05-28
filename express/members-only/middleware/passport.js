const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

const verifyCallback = async (username, password, done) => {
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return done(null, false, { message: 'Incorrect username' });
        }
        if (user.password !== password) {
            return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
    try {
        const user = await User.findById(userId);
        done(null, user);
    } catch (err) {
        done(err);
    }
});
