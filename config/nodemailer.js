const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('../config/enviroment');

// How the communication takes place
let transporter = nodemailer.createTransport(env.smtp);

// Filepath for the HTML Email in the dir
let renderTemplate = (data,relativePath) =>
{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){console.log('Error in rendering template');return}
            mailHTML = template;
        }
    )
    return mailHTML;
}
module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate
}