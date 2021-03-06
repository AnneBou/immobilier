module.exports = (app) => {

    //////////// SITE /////////////

    // Accueil
    app.get('/', (req, res) => {
        let Home = require('../src/controller/Home.js');
        (new Home()).print(req, res);
    });

    // Détails d'un bien
    app.get('/detail/:slug', (req, res) => {
        let Home = require('../src/controller/Home.js');
        (new Home()).printRealty(req, res);
    });

    // Inscription (get)
    app.get('/inscription', (req, res) => {
        let Register = require('../src/controller/Register.js');
        (new Register()).print(req, res);
   });

   // Inscription (post)
    app.post('/inscription', (req, res) => {
        let Register = require('../src/controller/Register.js');
        (new Register()).process(req, res);
    });

    // Connexion (get)
    app.get('/connexion', (req, res) => {
        let Authenticated = require('../src/controller/Authenticated.js');
        (new Authenticated()).print(req, res);
    });

    // Connexion (post)
    app.post('/connexion', (req, res) => {
        let Authenticated = require('../src/controller/Authenticated.js');
        (new Authenticated()).process(req, res);
    });

    // Déconnexion (get)
    app.get('/deconnexion', (req, res) => {
        let Authenticated = require('../src/controller/Authenticated.js');
        (new Authenticated()).disconnect(req, res);
      });   
      
    //////////// BACK-OFFICE /////////////

    // Accueil admin 
      app.get('/admin', (req, res) => {
        let Dashboard = require('../src/controller/Dashboard.js');
        (new Dashboard()).print(req, res);
    }); 

    //////////// Biens /////////////

    // Ajouter un bien (get)
    app.get('/admin/realty/add', (req, res) => {
        let Realty = require('../src/controller/Realty.js');
        (new Realty()).printForm(req, res);
    });
    
    // Ajouter un bien (post)
    app.post('/admin/realty/add', 
    require('express-fileupload')({createParentPath: true}),
    require('../src/services/LcParserService.js'), 
    (req, res) => {
       let Realty = require('../src/controller/Realty.js');
       (new Realty()).process(req, res);
    });

    // Liste des biens
    app.get('/admin/realty/list', (req, res) => {
        let Realty = require('../src/controller/Realty.js');
        (new Realty()).print(req, res);
    });

    // Modifier un bien (get)
    app.get('/admin/realty/edit/:id', (req, res) => {
        let Realty = require('../src/controller/Realty.js');
        (new Realty()).printForm(req, res);
    });
    
    // Modifier un bien (post)
    app.post('/admin/realty/edit/:id', 
    require('express-fileupload')({createParentPath: true}),
    require('../src/services/LcParserService.js'), 
    (req, res) => {
       let Realty = require('../src/controller/Realty.js');
       (new Realty()).process(req, res);
    });


    // Supprimer un bien
    app.get('/admin/realty/delete/:id', (req, res) => {
        let Realty = require('../src/controller/Realty.js');
        (new Realty()).delete(req, res);
    });

    //////////// Utilisateurs /////////////

    // Ajouter un utilisateur (get)
    app.get('/admin/user/add', (req, res) => {
        let User = require('../src/controller/User.js');
        (new User()).printForm(req, res);
    });

    // Ajouter un utilisateur (post)
    app.post('/admin/user/add', 
    require('express-fileupload')({createParentPath: true}),
    require('../src/services/LcParserService.js'), 
    (req, res) => {
       let User = require('../src/controller/User.js');
       (new User()).process(req, res);
    });

    // Afficher la liste des utilisateurs
    app.get('/admin/user', (req, res) => {
        let User = require('../src/controller/User.js');
        (new User()).print(req, res);
    });

    // Modifier un utilisateur (get)
    app.get('/admin/user/edit/:id', (req, res) => {
        let User = require('../src/controller/User.js');
        (new User()).printForm(req, res);
    });

    // Modifier un utilisateur (post)
    app.post('/admin/user/edit/:id', (req, res) => {
        let User = require('../src/controller/User.js');
        (new User()).process(req, res);
    });

    // Supprimer un utilisateur
    app.get('/admin/user/delete/:id', (req, res) => {
        let User = require('../src/controller/User.js');
        (new User()).delete(req, res);
    });

};
