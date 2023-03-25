module.exports.setFlash = function(req,res,next){
   console.log("MiddleWare-->1",req.flash);
   res.locals.flash = {
    'success':req.flash('success'),
    'error':req.flash('error')
   }
   console.log("res-->2",res.locals.flash.success);
   
   next(); 
}