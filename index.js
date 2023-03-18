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



// Using Static files
app.use(express.static('./assets'));
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
    secret:'asd',
    saveUninitialized:true,
    resave:true,
    cookie:{
        maxAge:(100*60*100)
    },
    store:new MongoStore(
        {
            mongoUrl:'mongodb://localhost/socialise_development'
        }
    )
}));
app.use(cookieParser());
app.use(express.urlencoded());
app.use(passport.initialize());
app.use(passport.session());
app.use(passportLocal.setAuthenticatedUser);//Middleware which passes on the user{} from the req{} to res{} for views to access it 

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