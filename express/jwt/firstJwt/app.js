const express = require('express')
const jwt = require('jsonwebtoken')

const app = express();

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secret', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...',
                authData: authData,
            })
        }
    })
})

app.post('/api/login', (req, res) => {
    // mock user
    const user = {
        id: 1,
        username: 'Brad',
        email: 'brad@gmail.com',
    }

    jwt.sign({user: user}, 'secret', (err, token) => {
        res.json({
            token: token,
        });
    });
});

// Format of token
// Authorization: Bearer: <access_token>

// Verify token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization']
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        console.log(bearerToken);
        // Set the token
        req.token = bearerToken;
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

app.listen(3000, () => console.log('App started here http://localhost:3000 :)'))