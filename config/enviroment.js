const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');
const logDirectory = path.join(__dirname,'../produciton_logs')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
})




const development = {
    name:'development',
    asset_path:'/assets' ,
    session_cookie_key:'asd',
    db:'socialise_development',
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:'socialise.india.web@gmail.com',
            pass:'bzvukndojhtxacyh'
        }
    },
    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    }
}

const production = {
    name:'production',
    asset_path:process.env.SOCIALISE_ASSET_PATH ,
    session_cookie_key:process.env.SOCIALISE_SESSION_COOKIE_KEY,
    db:process.env.SOCIALISE_DB,
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:'socialise.india.web@gmail.com',
            pass:'bzvukndojhtxacyh'
        }
    },
    morgan:{
        mode:'combined',
        options:{stream:accessLogStream}
    }
}

module.exports = eval(process.env.SOCIALISE_ENVIROMENT) == undefined ? development:production;

