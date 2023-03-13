const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db_connection = require('./config/mongoose');//establishing connection with the MongoDb database.

// Using Static files
app.use(express.static('./assets'));
// Using Layouts
app.use(expressLayouts);
// Extarct styles and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
// use express routers
app.use('/',require('./routes'));
//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running the server:${err}`);
        return;
    }
    console.log(`Server is running on port: ${port}`);
})