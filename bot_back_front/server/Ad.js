import mongoose from "mongoose";

const Ad = new mongoose.Schema({
    imgSrc: {type: String, required: true},
    description: {type: String, required: true},
}, {collection: 'ads'})

export default mongoose.model('Ad', Ad)