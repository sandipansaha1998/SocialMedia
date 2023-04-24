const User = require('../models/user');

module.exports.createSession =  function(req,res)
{
   req.flash('success','Logged in Successfully');
   return res.redirect('/');
}

module.exports.destroySession = function(req,res)
{
  
    req.logout(function(err){
        if (err) { console.log(err); return; } 
        req.flash('success','Logged out');
        return res.redirect('/login');
      });    
};