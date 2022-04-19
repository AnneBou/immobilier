module.exports = (app) => {
    app.get('/hello',(req,res) => {
        res.send('Hello world');
    });
    app.get('/', (req, res) => {
        let Home = require('../src/controller/Home.js');
        (new Home()).print(req, res);
    });
    app.get('/inscription', (req, res) => {
        let Register = require('../src/controller/Register.js');
        (new Register()).print(req, res);
   });
    app.post('/inscription', (req, res) => {
        let Register = require('../src/controller/Register.js');
        (new Register()).process(req, res);
    });
    app.get('/connexion', (req, res) => {
        let Authenticated = require('../src/controller/Authenticated.js');
        (new Authenticated()).print(req, res);
      });
    app.post('/connexion', (req, res) => {
        let Authenticated = require('../src/controller/Authenticated.js');
        (new Authenticated()).process(req, res);
    });
    app.get('/deconnexion', (req, res) => {
        let Authenticated = require('../src/controller/Authenticated.js');
        (new Authenticated()).disconnect(req, res);
      });     
    //   Accueil admin 
      app.get('/admin', (req, res) => {
        let Dashboard = require('../src/controller/Dashboard.js');
        (new Dashboard()).print(req, res);
    }); 
    // Liste des biens
    app.get('/admin/realty/list', (req, res) => {
        let Realty = require('../src/controller/Realty.js');
        (new Realty()).print(req, res);
    });
    // Ajouter un bien (get)
    app.get('/admin/realty/add', (req, res) => {
        let Realty = require('../src/controller/Realty.js');
        (new Realty()).printForm(req, res);
    });
    // Ajouter un bien (post)
    app.post('/admin/realty/add', (req, res) => {
        let Realty = require('../src/controller/Realty.js');
        (new Realty()).process(req, res);
    });
    // Supprimer un bien
    app.get('/admin/realty/delete/:id', (req, res) => {
        let Realty = require('../src/controller/Realty.js');
        (new Realty()).delete(req, res);
    });

};
