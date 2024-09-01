const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
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
    type_of:{
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 0
    }, 
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})
 
module.exports = User = mongoose.model('User',UserSchema)