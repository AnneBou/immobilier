const RepoRealty = require('../repository/Realty');

module.exports = class Realty {
    // Liste des biens (get)
    print(request, response) {
      if(typeof request.session.user !== 'undefined') {
          let repo = new RepoRealty();
          repo.find().then((realties) => {
              response.render('admin/realty/list', {realties});
          });
      } else {
          request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
          response.redirect('/connexion');  
      }
  }

    // Affichage du formulaire (get)
    printForm(request, response) {
      if(typeof request.session.user !== 'undefined') {
         response.render('admin/realty/add');
         return;
      }
       request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
      response.redirect('/connexion');  
    }

    // Prise en compte du formulaire : ajout d'un bien (post)
    process(request, response) {
      console.log(request.body);
      let entity = {
        // On récupère les données de l'objet ou un tableau si c'est vide
        address : request.body.address || {},
        contact : request.body.contact || {},
        realty : request.body.realty || {},
        agent : request.body.agent || {},
        // On récupère le nom de l'agent grâce à l'ID de sa session (utilisateur admin)
        // agent : request.session.user
        // Alternative :
        // address : {
        //   address1 : request.body.address.address || '',
        //   address2 : request.body.address.address || '',
        //   zipcode : request.body.address.zipcode || '',
        //   city : request.body.address.city || '',
        //   info : request.body.address.info || ''
        // },

      };

      let repo = new RepoRealty();
      // Promesse (méthode asynchrone)
      // Quand on a la réponse, alors ("then") redirection
      repo.add(entity).then((user) => {
          // resolve
          request.flash('notify', 'Le bien a été ajouté avec succès.');
          response.redirect('list');
          // reject
      }, (err) => {
          response.render('add', { 
              error : `L'enregistrement en base de données a échoué`, 
              form : entity 
          }); 
      });         
  }

  // Suppression du formulaire

  delete(request, response) {
    if(typeof request.session === 'undefined' || typeof request.session.user === 'undefined') {
        request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
        response.redirect('/connexion');  
        return;
    }

    if(typeof request.params.id != 'undefined'
&& request.params.id != '') {
        let repo = new RepoRealty();
        repo.delete({_id : request.params.id}).then(() => {
            request.flash('notify', 'Le bien a été supprimé.');
            response.redirect('list');
        }, () => {
            request.flash('error', 'La suppression du bien a échoué.');
            response.redirect('list');
        });  
    } 
    else {
        request.flash('error', 'Une erreur est survenue.');
        response.redirect('list');
    }
}


};
  