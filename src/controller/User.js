const RepoUser = require('../repository/User');

module.exports = class Realty {
    // Liste des utilisateurs
    printUser(request, response) {
        if(typeof request.session.user !== 'undefined') {
            let repo = new RepoUser();
            repo.find().then((realties) => {
                response.render('admin/user', {users});
            });
        } else {
            request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
            response.redirect('/connexion');  
        }
    }
}