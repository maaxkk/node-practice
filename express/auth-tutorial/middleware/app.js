const express = require('express');

const app = express();

// app.use(middleware2);
app.use(middleware1);
app.use(errorHandler)

function middleware1(req, res, next) {
    req.customProp = 100;
    console.log('I am middleware 1');
    // const errorObj = new Error('I am an error')
    // next(errorObj);
    next();
}

function errorHandler(err, req, res, next) {
    if (err) {
        res.send('<h1>Error happened in app!</h1>')
    }
}

// function middleware2(req, res, next) {
//     console.log('I am middleware 2');
//     next();
// }

function middleware3(req, res, next) {
    console.log('I am middleware 3');
    req.customProp = 600;
    next();
}

// function standardExpressCallback(requestObject, responseObjct, nextMiddleware) {
//     console.log('I am standard function')
//     responseObjct.send('<h1>Hello world</h1>')
// }

app.get('/', middleware3, (req, res, next) => {
    console.log('I am standard function')
    res.send(`<h1>Value is ${req.customProp}</h1>`)
})


app.listen(3000);