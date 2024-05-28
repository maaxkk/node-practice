const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const crypto = require('crypto');
const routes = require('./routes');
const User = require('./user');
require('dotenv').config()

const MONGO_URI = `${process.env.MONGO_URI}`;

mongoose.connect(MONGO_URI)


// Package documentation - https://www.npmjs.com/package/connect-mongo
const MongoStore = require('connect-mongo');

// Need to require the entire Passport config module so app.js knows about it
require('./passport');


/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Create the Express application
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


/**
 * -------------- SESSION SETUP ----------------
 */

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: MONGO_URI,
        collectionName: 'sessions'
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //cookie valid for 24 hours
}))

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
});

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(routes);


/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(3000);