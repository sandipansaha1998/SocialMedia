const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db_connection = require('./config/mongoose');//establishing connection with the MongoDb database.
// use session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const MongoStore =  require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const env = require('./config/enviroment')
const path = require('path')
const logger = require('morgan');
require('./config/view-helpers')(app);
const fs = require('fs');
console.log(env.asset_path);
// Using Static files
app.use(express.static(path.join(__dirname,env.asset_path)));
console.log(env.session_cookie_key)
// Using Layouts
app.use(expressLayouts);
// Extarct styles and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');
// Using express-session to implement session cookie
app.use(session({
    name:'socialise',
    // TODO change the secrect before deployment
    secret:env.session_cookie_key,
    saveUninitialized:true,
    resave:true,
    cookie:{
        maxAge:(100*60*100)
    },
    store:new MongoStore(
        {
            mongoUrl:`mongodb://localhost/${env.db}`
        }
    )
}));
app.use(cookieParser());
app.use(express.urlencoded());
app.use(logger(env.morgan.mode,env.morgan.options))
//make the uploads path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));



app.use(passport.initialize());
app.use(passport.session());
app.use(passportLocal.setAuthenticatedUser);//Middleware which passes on the user{} from the req{} to res{} for views to access it 
// Uses session cookies
app.use(flash());
app.use(customMware.setFlash);
// use express routers
app.use('/',require('./routes'));
app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running the server:${err}`);
        return;
    }
    console.log(`Server is running on port: ${port}`);
})