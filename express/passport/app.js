require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;

const mongoDb = `${process.env.MONGO_URI}`
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'))

const User = mongoose.model(
    'User',
    new Schema({
        username: {type: String, required: true},
        password: {type: String, required: true}
    })
);

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({username: username})
            if (!user) {
                return done(null, false, {message: "Incorrect username"})
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, {message: 'Incorrect password'})
            }
            return done(null, user);
        } catch (e) {
            return done(e);
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    }  catch (e) {
        done(e)
    }
})

const app = express();
app.set('views', __dirname);
app.set('view engine', 'ejs')

app.use(session({secret: 'cats', resave: false, saveUninitialized: true}));
app.use(passport.session());
app.use(express.urlencoded({extended: false}));
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

app.get('/sign-up', (req, res) => res.render('sign-up-form'))
app.post('/sign-up', async (req, res, next) => {
    bcrypt.hash(req.body.password, 10, async(err, hashedPassword) => {
        if (err) {
            return next(err)
        }
        try {
            const user = new User({
                username: req.body.username,
                password: hashedPassword
            });
            const result = await user.save();
            res.redirect('/');
        }  catch (e) {
            return next(e)
        }

    })
})
app.post('/log-in', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
}))
app.get('/', (req, res) => {
    res.render('index', {user: req.user});
})
app.get('/log-out', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/')
    })
})

app.listen(3000, () => console.log('app listening on port 3000'))