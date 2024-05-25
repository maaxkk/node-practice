import express  from 'express'
import mongoose from 'mongoose'
import router from "./router.js";
import fileUpload from 'express-fileupload';

const PORT = 5000;
const DB_URl = `mongodb+srv://maaxkk:Maxlol101@cluster0.c5fsfb3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const app = express();
app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({}))
app.use('/api', router)


async function startApp() {
    try {
        await mongoose.connect(DB_URl, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log(`SERVER STARTED AT PORT ` + PORT))
    } catch (e) {
        console.log(e)
    }
}

startApp()