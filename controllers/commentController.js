const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.createComment = async function(req,res)
{
    try{
    const post =  await Post.findById(req.body.postID);
    
    if(post){
        let comment =  await Comment.create({
            content:req.body.content,
            postID:req.body.postID,
            user:req.user._id, 
        });
        post.comments.push(comment);
        post.save();
        if(req.xhr){
            return res.status(200).json({
                data:{
                    comment:comment,
                    message:"Comment Created",
                    username:req.user.name,
                    postID:req.body.postID,
                    }
                })
            
        }
        res.redirect('/');
    }
    else
    {
        res.redirect('/');
    }
    }catch(e){
        console.log("Error",e);
    }
};

module.exports.destroy  = async function(req,res){
    let comment = await Comment.findById(req.params.id);
    console.log(req.params.id);
    try{
    if(comment.user == req.user.id)
    {
    await Post.findByIdAndUpdate(comment.post,{$pull:{comments:req.params.id}});
    comment.deleteOne();
    if(req.xhr){
        return res.status(200).json({
            data:{
                commentID:comment._id,
                postID:req.body.postID,
                message:"Comment Deleted"
                }
            })
        
    }
    return res.redirect('back');
    }
    else
        return res.redirect('back');
    }catch(e){
        console.log("Error",e);
    }
};
