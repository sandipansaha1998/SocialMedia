const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment')
module.exports.index = async function(req,res){
    try{
    let likable;
    if(req.body.entity_type == 'Post')
    {
        likable = await Post.findById(req.body.likable_id);
    }
    else
    {
        likable = await Comment.findById(req.body.likable_id);
    }
    let like = await Like.findOne({
        user:req.user._id,
        likable:likable._id,
        onModel:req.body.entity_type
    })
    // console.log(like)
    if(like == null)
    {
     like = await Like.create({
        user:req.user,
        likable:req.body.likable_id,
        onModel:req.body.entity_type
    }) 

    // console.log(likable)
    likable.likes.push(like);
    likable.save();
    }
    else{
       
        await like.populate({path:'likable'});
       let updated_likable = await  Post.findOneAndUpdate(
                likable._id ,
                { $pull: { 'likes': like._id } }
  )
    await like.deleteOne();
  console.log(updated_likable)
    }}catch(e){
        console.log(e)
        return res.json(301,{
            message:'Internal Server Error'
        })
    }
}
