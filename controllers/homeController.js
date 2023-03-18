const User = require('../models/user');
const Post = require('../models/post');

module.exports.home = async function(req,res)
{
    let posts = await Post.find({})
                          .populate({
                            path:'user'
                          })
                          .populate({
                            path:'comments',
                            populate:{
                                path:'user'
                            }
                          })
                          .then( data=>{return data})
                          .catch(err => {return err;})
    console.log(posts);
    return res.render('home',
    {
        title:"Socialise",
        posts:posts,
        
    });
    
}
module.exports.login = function (req,res) 
{
    if(req.isAuthenticated())
    {   
        return res.redirect('/');
    }

    return res.render('login',{
        title:'Socialise|Login',
        layout:'access_layout'
    })
}
module.exports.signUp = function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/');
    }
    return res.render('signup',{
        title:'Socialise|Login',
        layout:'access_layout'
    })
}














module.exports.user_profile = function(req,res)
{
    console.log("Locals"+res.locals.user)
    return res.render('userProfile',
    {
        title:"User Profile"
    })
}