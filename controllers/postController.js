const Post = require('../models/post');
const Comment = require('../models/comment')
module.exports.create_new_post = async function (req,res) {
    let newPost = {
        content : req.body.content,
        user :  req.user._id 
    }
    try{
        let post = await Post.create(newPost);
        req.flash('success','Post Published');
        return res.redirect('back');
    }catch(e){
        req.flash('error',e);
        return res.redirect('back');
    }
};

module.exports.destroy = async function (req,res) {
    try{
        let posts = await Post.findById(req.params.id);
        if(posts.user == req.user.id){
            posts.deleteOne();
            await Comment.deleteMany({postID:req.params._id});
            req.flash('success','Post Deleted');
            return res.redirect('back');
         }
         else{
            req.flash('error','Post Not Found');
            return res.redirect('back');
         }
            
        }catch(e){
            req.flash('error',e);
            return res.redirect('back');
    }
};