const mongoose = require('mongoose')

const OrganSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    handle: {
        type: String,
        required: true,
        unique: true,
        max: 40
      },
    type_of:{
        type: Boolean,
        default: true
    },
   
   
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Organization = mongoose.model('organization',OrganSchema)