const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    tagName: String,
})

module.exports = mongoose.model('UserModel',UserSchema)