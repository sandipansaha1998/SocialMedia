const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.createComment = async function(req,res)
{
    console.log(req.body.content+" "+req.body.content+" "+req.body.postID);
    
    const newComment = await Post.findById(req.body.postID).then(async function(post) {
        if(post)
        {
            console.log(post);
            await Comment.create({
                content:req.body.content,
                postID:req.body.postID,
                user:req.user._id,
                
            }).then(comment =>{
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            });
        }
    })
}