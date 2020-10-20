const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    major: { type: String },
    year: { type: String },     
    profiles: { type: Array }
})

module.exports = mongoose.model('User', User);