import mongoose from "mongoose";

const Ad = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    mainImg: {type: String, required: true},
    additionalImg: {type: [String]},
})

export default mongoose.model('Ad', Ad)