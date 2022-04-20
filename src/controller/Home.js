const RepoRealty = require('../repository/Realty');

module.exports = class Home {
    print(req, res) {
        res.render('home');  
    }
};

module.exports = class Realty {
    // Liste des biens
    print(request, response) {
        let repo = new RepoRealty();
        repo.find().then((realties) => {
            response.render('list', {realties});
        });
    }
}