module.exports = (app) => {
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
      app.get('/admin', (req, res) => {
        let Dashboard = require('../src/controller/Dashboard.js');
        (new Dashboard()).print(req, res);
    });    

};
