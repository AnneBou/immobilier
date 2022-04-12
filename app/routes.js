module.exports = (app) => {
    app.get('/', (req, res) => {
        let Home = require('../src/controller/Home.js');
        (new Home()).print(req, res);
    });
    app.get('/inscription', (req, res) => {
        let Register = require('../src/controller/Register.js');
        (new Register()).print(req, res);
   });
   
};
