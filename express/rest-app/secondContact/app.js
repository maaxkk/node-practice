const express = require('express');
require('dotenv').config();
const {v4: uuidv4} = require('uuid');


const router = require('./routes')
let {users, messages} = require('./models')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
    req.context = {
        users,
        messages,
        me: users[1]
    }
    next();
});

app.use('/session', router.session);
app.use('/users', router.user);
app.use('/messages', router.message);



app.listen(3000, () => console.log('App started here http://localhost:3000 :)'))
