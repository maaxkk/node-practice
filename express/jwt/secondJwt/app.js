require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const authRoter = require('./authRouter')

const app = express();

app.use(express.json());

app.use('/auth', authRoter)
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(PORT, () => console.log(`App started http://localhost:${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

start();