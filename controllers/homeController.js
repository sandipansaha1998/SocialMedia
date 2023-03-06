module.exports.home = function(req,res)
{
    return res.render('home',
    {
        title:"Socialise"
    });
    
}

module.exports.user_profile = function(req,res)
{
    return res.render('userProfile',
    {
        title:"User Profile"
    })
}