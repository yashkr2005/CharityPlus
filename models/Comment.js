const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const commentSchema=new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post:{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type:String
    },
    image: [ {
        url: String
    }],
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    likes:[
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    unlikes:[
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    approval: {
        type: Boolean,
        default: false
    },
    post_event: {
        type: Boolean
    },
    user_typeof: {
        type: Boolean
    }
});

module.exports = Comment = mongoose.model('Comment', commentSchema)