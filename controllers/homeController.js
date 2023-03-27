const User = require('../models/user');
const Post = require('../models/post');

module.exports.home = async function(req,res)
{
    try{
        let posts = await Post.find({})
                          .sort('-createdAt')
                          .populate({
                            path:'user'
                          })
                          .populate({
                            path:'comments',
                            populate:{
                                path:'user'
                            }
                          });
        return res.render('home',
        {
            title:"Socialise",
            posts:posts,            
        });

    }catch(e){
        console.log('Error',e);
    }
    
                          
  
    
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