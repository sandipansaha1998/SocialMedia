const mongoose = require('mongoose');
const likeSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.ObjectId,
            required:true
        },
        // ID of the parent object
        likable:{
            type:mongoose.Schema.ObjectId,
            required:true,
            refPath:'onModel'
        },
        // Type of Like Object
        onModel:{
            type:String,
            required:true,
            enum:['Post','Comment']
        }
        
    },{
        timestamps:true
      }
);
const Like = mongoose.model('Like',likeSchema);
module.exports = Like;