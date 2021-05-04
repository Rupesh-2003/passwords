const mongoose = require('mongoose')

const Schema = mongoose.Schema

const User = new Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    passwordList: [{type: Object, required: false}]
})

module.exports = mongoose.model('User', User)