const User = require('../models/user');

module.exports.createSession = async function(req,res)
{
   return res.redirect('/');
}

module.exports.destroySession = function(req,res)
{
    req.logout(function(err) {
        if (err) { return next(err); }});
    return res.redirect('/')
}

