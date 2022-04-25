const { saveBufferToFile } = require('express-fileupload/lib/utilities');
const RepoUser = require('../repository/User');

module.exports = class User {

    // Afficher un formulaire (get)
    printForm(request, response) {
        if(typeof request.session === 'undefined' || typeof request.session.user === 'undefined') {
            request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
            response.redirect('/connexion');  
            return;
        }

        // Modifier un formulaire existant
        if(typeof request.params.id !== 'undefined') {
            let repo = new RepoUser();
            repo.findById(request.params.id).then((user) => {
                response.render('admin/user:form', {form : user });
            }, () => {
                request.flash('error',`L\'utilisateur n'a pas été trouvé`);
                response.redirect('/admin/user');
            });   
        } 

        // Remplir un formulaire vide (ajouter)
        else {
            response.render('admin/user/form', {form: {}});
        }
    }
    
    // Ajouter un bien (post)
    process(request, response) {
        let entity = {
            // On récupère les données de l'objet ou une chaîne de caractères si c'est vide
            email : request.body.email || '',
            password : request.body.password || '',
            civility : request.body.civility || '',
            firstname: request.body.firstname || '',
            lastname: request.body.lastname || '',
            phone: request.body.phone || ''
        };
    
        let repo = new RepoUser();
        let save;
        // Modifier un bien (post)
        if(typeof request.params.id !== 'undefined') {
            save = repo.edit(entity, request.params.id);        
        // Ajouter un bien (post)
        } else {
            save = repo.add(entity);   
        }


        save.then((user) =>{
            if(typeof request.params.id !== 'undefined') {
                request.flash('notify', 'L\'utilisateur a été modifié avec succès.');
            }
            else {
                request.flash('notify', 'L\'utilisateur a été ajouté avec succès.');
            }
        }, () => {
            request.flash('error',`Une erreur est survenue`);
            response.redirect('/admin/user'); 
        })
    }

    // Liste des biens
    print(request, response) {
        if(typeof request.session.user !== 'undefined') {
            let repo = new RepoUser();
            repo.find().then((users) => {
                response.render('admin/user', {users});
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
            let repo = new RepoUser();
            repo.delete({_id : request.params.id}).then(() => {
                request.flash('notify', 'L\'utilisateur a été supprimé.');
                response.redirect('/admin/user');
            }, () => {
                request.flash('error', 'La suppression de l\'utilisateur a échoué.');
                response.redirect('/admin/user');
            });  
        } 
        else {
            request.flash('error', 'Une erreur est survenue.');
            response.redirect('/admin/user');
        }
    }

};
  