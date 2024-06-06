import dotenv from 'dotenv';
dotenv.config();
import express  from 'express'
import mongoose from 'mongoose'
import router from "./router.js";
import handleError from './errorHandling.js';
import cors from 'cors';

const PORT = 3000;
const DB_URL = `${process.env.DB_URL}`;

const app = express();
app.use(cors({
    credentials: true,
    origin: [process.env.CLIENT_URL, process.env.CLIENT_ADMIN_URL],
}));
app.use(express.json())
app.use(express.static('static'))
app.use('/api', router)


app.use(handleError)

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log(`SERVER STARTED AT PORT ` + PORT))
    } catch (e) {
        console.log(e)
    }
}

startApp()