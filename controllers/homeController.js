const User = require('../models/user');


module.exports.home = function(req,res)
{
    return res.render('home',
    {
        title:"Socialise"
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

module.exports.createSession = async function(req,res)
{
   return res.redirect('/')
}

module.exports.destroySession = function(req,res)
{
    req.logout(function(err) {
        if (err) { return next(err); }});
    return res.redirect('/')
}











module.exports.createUser = async function(req,res)
{   

    let newUser = {
        email:req.body.email,
        password:req.body.password,
        name:req.body.fName+' '+req.body.lName
    }
    const createUser = await User.create(newUser).then(
        newUser => 
        {
            console.log(`User created succesfully`); 
            return res.redirect('/')}) 
            .catch(error=>{console.log(`Error in creating user`); return res.redirect('back')});
   
}

module.exports.user_profile = function(req,res)
{
    console.log("Locals"+res.locals.user)
    return res.render('userProfile',
    {
        title:"User Profile"
    })
}