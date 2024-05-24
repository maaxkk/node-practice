import express  from 'express'
import mongoose from 'mongoose'
import router from "./router.js";
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';

dotenv.config();
const PORT = 5000;
const DB_URL = `${process.env.DB_URL}`;

const app = express();
app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({}))
app.use('/api', router)


async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log(`SERVER STARTED AT PORT ` + PORT))
    } catch (e) {
        console.log(e)
    }
}

startApp()