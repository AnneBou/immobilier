const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config()
 
//--------------------------------------------------------------------
//      Parse les données soumises en post
//--------------------------------------------------------------------
app.use(express.urlencoded({ extended: true }));
//--------------------------------------------------------------------
//      Mise en place du moteur de template
//--------------------------------------------------------------------
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');
//--------------------------------------------------------------------
//      Ajout du midlleware express session
//--------------------------------------------------------------------
const session = require('express-session');
app.use(session({
    secret: process.env.APP_KEY, resave:false, saveUninitialized:false, 
    cookie: {maxAge: 3600000} 
}));
app.use((req,res,next) => {
    res.locals.session = req.session;
    res.locals.route = req._parsedUrl.pathname;
    next();
});

const sassMiddleware = require('node-sass-middleware');
app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, 'build/'),
    dest: path.join(__dirname, 'public/'),
    debug: false,   // true pour voir les traitements effectués
    indentedSyntax: false, // true Compiles files with the .sass extension
    outputStyle: 'compressed'
}));

app.use((req,res,next) => {
    res.locals.session = req.session;
    next();
});
//--------------------------------------------------------------------
//      Ajout du midlleware express flash messages
//--------------------------------------------------------------------
const flash = require('express-flash-messages');
app.use(flash());
//--------------------------------------------------------------------
//      Spécifique à la simulation d'une connexion en mode get
//--------------------------------------------------------------------
if(process.env.APP_ENV === 'dev') {
    app.use((req, res, next) =>{
        req.session.user = {
            email : "luisf@gmail.com",
            civility : "1",
            firstname: "Luis",
            lastname: "Flores",
            phone: "0607080910",
        };
        next();
    });
}
//--------------------------------------------------------------------
//      Mise en place du répertoire static
//--------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
 
//--------------------------------------------------------------------
//      Chargement des routes
//--------------------------------------------------------------------
require('./app/routes')(app);
 
//--------------------------------------------------------------------
//     Ecoute du serveur HTTP
//--------------------------------------------------------------------
app.listen(process.env.PORT,() => {
    console.log(`Le serveur est démarré: http://localhost:${process.env.PORT}`);
    if (process.send) {
        process.send('online');
    }
});

