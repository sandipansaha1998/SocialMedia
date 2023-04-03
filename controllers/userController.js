
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
module.exports.update = async function(req,res){
    try{
    
    if(req.user.id == req.params.id){
        
        let user = await User.findById(req.params.id);
        console.log(user);
        User.uploadedAvatar(req,res,function(err){
            if(err){console.log(err)}
            console.log(req.body.fName+' '+req.body.lName)
            user.name = req.body.fName+' '+req.body.lName;
            if(req.file){
            user.avatar = User.avatarPath+'/'+req.file.filename;
        }
        user.save();
    });
    req.flash('success','Updated');
        return res.redirect('back');
    }
    }catch(error){
    req.flash('error',error);
    return res.redirect('back'); 
    }
   
}