Post = require('../models/post');

module.exports.create_new_post = async function (req,res) {
    let newPost = {
        content : req.body.content,
        user :  req.user._id 
    }
    await Post.create(newPost).then(
        newUser => 
        {
            console.log(`Post created succesfully`); 
            
        }) 
         .catch(error=>{console.log(`Error in creating post`);});
         return res.redirect('/')
  }