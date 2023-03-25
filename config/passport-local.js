const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
// Authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
},
// Callback function whenever local strategy is used
async function(req,email,password,done){
    //Find a user and establish the identity
    // console.log(email+" "+password);
    await User.findOne({email:email}).then(user=>{
        if(!user || user.password!=password)
            {
        // Authentication is false and error is null
            req.flash('error','Incorrect Username/Password')
            return done(null,false);
            }
        // console.log(user);
        return done(null,user);
    }
    ).catch(err => {req.flash('error',err);return err})
}
));

// serializing the user to decide which key is to be added to the cookies
passport.serializeUser(function(user,done){
    // console.log("Serialised");
    done(null,user._id);
})
// deserialising the user from the key in the cookies
passport.deserializeUser(async function(userID,done){
    // console.log("Deserialised");
    const userInfo = await User.findById(userID).then(users => {return users}).catch(err=>{console.log("Error in finding the user");return done(err)});
    // console.log(userInfo);
    return done(null,userInfo);
});

// Middleware to check Authentication
passport.checkAuthentication = function(req,res,next){
    // console.log(req.isAuthenticated());
    // if the user is signedin,then
    if(req.isAuthenticated())
        return next();
    
    // if not signedIn
    return res.redirect('/login');
}

passport.setAuthenticatedUser = function (req,res,next) {
    // console.log("Setting Locals");
    // console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        // console.log(req.user);
        // req.user contains the current signed in user from the session cookie and this tranfers to the respond locals for view
        res.locals.user = req.user;
        // console.log(res.locals)
    }
    next();
  }



module.exports = passport;