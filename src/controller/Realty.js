const RepoRealty = require('../repository/Realty');

module.exports = class Realty {

    // Afficher un formulaire (get)
    printForm(request, response) {
        if(typeof request.session === 'undefined' || typeof request.session.user === 'undefined') {
            request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
            response.redirect('/connexion');  
            return;
        }

        // Modifier un formulaire existant
        if(typeof request.params.id !== 'undefined') {
            let repo = new RepoRealty();
            repo.findById(request.params.id).then((realty) => {
                console.log(realty);
                response.render('admin/realty/form', {form : realty });
            }, () => {
                request.flash('error',`Le bien n'a pas été trouvé`);
                response.redirect('/admin/realty/list');
            });   
        } 

        // Remplir un formulaire vide (ajouter)
        else {
            response.render('admin/realty/form', {form: { realty:{}, agent : {}, contact: {}, address : {}}});
        }
    }
    
    // Ajouter un bien (post)
    process(request, response) {
        let entity = {
            // On récupère les données de l'objet ou un tableau si c'est vide
            address : request.body.address || {},
            contact : request.body.contact || {},
            realty : request.body.realty || {},
            agent : request.body.agent || {},
        };
    
        let repo = new RepoRealty();
    
        // Modifier un bien (post)
        if(typeof request.params.id !== 'undefined') {
            repo.updateOne(entity, request.params.id).then((realty) =>{
                request.flash('notify', 'Le bien a été modifié avec succès.');
                response.redirect('/admin/realty/list');
            }, () => {
                request.flash('error',`Le bien n'a pas été trouvé`);
                response.redirect('/admin/realty/list'); 
            });
        
        // Ajouter un bien (post)
        } else {
            repo.add(entity).then((user) => {
                // resolve
                request.flash('notify', 'Le bien a été ajouté avec succès.');
                response.redirect('/admin/realty/list');
                // reject
            }, (err) => {
                response.render('admin/realty/form', { 
                    error : `L'enregistrement en base de données a échoué`, 
                    form : entity 
                }); 
            });   
        }
    }

    // Liste des biens
    print(request, response) {
        if(typeof request.session.user !== 'undefined') {
            let repo = new RepoRealty();
            repo.find().then((realties) => {
                response.render('/admin/realty/list', {realties});
            });
        } else {
            request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
            response.redirect('/connexion');  
        }
    }

    // Supprimer un bien
    delete(request, response) {
        if(typeof request.session === 'undefined' || typeof request.session.user === 'undefined') {
            request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
            response.redirect('/connexion');  
            return;
        }
        if(typeof request.params.id != 'undefined' && request.params.id != '') {
            let repo = new RepoRealty();
            repo.delete({_id : request.params.id}).then(() => {
                request.flash('notify', 'Le bien a été supprimé.');
                response.redirect('/admin/realty/list');
            }, () => {
                request.flash('error', 'La suppression du bien a échoué.');
                response.redirect('/admin/realty/list');
            });  
        } 
        else {
            request.flash('error', 'Une erreur est survenue.');
            response.redirect('/admin/realty/list');
        }
    }

};
  