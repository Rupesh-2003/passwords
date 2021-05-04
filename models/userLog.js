const { response } = require("express")

const mongoose =  require('mongoose')

const Schema = mongoose.Schema

const Log = new Schema({
    ipAddress: {type: String},
    deviceDetails: {type: String},
    date: {type: String},
    time: {type: String},
    latitude: {type: String},
    longitude: {type: String},
    location: {type: String}
})

module.exports = mongoose.model('Logs', Log)