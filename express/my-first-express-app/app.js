const express = require('express');
const logger = require('morgan');
const app = express();
const port = 3000;
const wiki = require('./wiki.js')

const a_middleware_function = function (req, res, next) {
    // Perform some operations
    console.log('We are in middleware')
    req.requestTime = Date.now();
    next(); // Will call next middleware function in the chain
};

// for all router and verbs
// app.use(a_middleware_function, (req, res, next) => {
//     console.log('Wow this an another middleware')
//     console.log(`Request time is ${new Date(req.requestTime)}`)
//     next();
// })

app.use(express.static('public'))
app.use(logger('dev'))
app.use('/wiki', wiki);


app.get('/', (req, res) => {
    res.sendFile('public/index.html', {root: __dirname})
})

app.get('/about', (req, res) => {
    res.sendFile('public/about.html', {root: __dirname})
})

app.get('/contact-me', (req, res) => {
    res.sendFile('public/contact-me.html', {root: __dirname})
})


app.use((req, res, next) => {
    res.status(404);
    //respond with html page
    if (req.accepts('html')) {
        res.sendFile('public/404.html', {root: __dirname});
        return;
    }
    // respond with json
    if (req.accepts('json')) {
        res.json({error: 'Not found'})
        return;
    }
    res.type('txt').send('Not found')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port} http://localhost:${port}`)
});
