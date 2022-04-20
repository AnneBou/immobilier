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

    // Afficher les détails d'un bien
    printRealty(request, response) {
        if(typeof request.params.id !== 'undefined') {
            let repo = new RepoRealty();
            repo.findById(request.params.id).then((realty) => {
                console.log(realty);
                response.render('detail', {realty});
            }, () => {
                request.flash('error',`Le bien n'a pas été trouvé`);
                response.redirect('/');
            });   
        } 
    }

}