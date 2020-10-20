const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    name: { type: String, required: true},
    email: { type: String },
    password: { type: String },
    pic: { type: String, required: true },
    major: { type: String, required: true },
    year: { type: String, required: true },     
    classes: { type: Array, required: true }
})

module.exports = mongoose.model('User', User);