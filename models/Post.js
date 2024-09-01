const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type:String
    },
    avatar: {
        type: String
    },
    event: {
        type: Boolean,
        default: false
    },
    likes:[
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    unlikes:[
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    image: [ {
        url: String
    }],
    comments: [
        {
            type:Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Post = mongoose.model('Post', PostSchema)