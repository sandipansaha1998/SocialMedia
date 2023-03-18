
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
            console.log(`User created succesfully`); 
            return res.redirect('/')}) 
            .catch(error=>{console.log(`Error in creating user`); return res.redirect('back')});
   
}
