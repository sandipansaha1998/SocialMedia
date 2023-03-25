
const User = require('../models/user');

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
            req.flash('success','User Successfully Created');
            return res.redirect('/login');
        })
        .catch(error=>{
            req.flash('error',error);
            return res.redirect('back');
        });  
}
