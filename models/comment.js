const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    // comment belongs to a user
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    postID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
    },{
        timeseries:true
    });

const Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;
