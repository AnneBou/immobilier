const RepoRealty = require('../repository/Realty');

module.exports = class Realty {
    // Liste des biens (get)
    print(request, response) {
      if(typeof request.session.user !== 'undefined') {
         response.render('admin/realty/list');
         return;
      }
       request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
      response.redirect('/connexion');  
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
        address : request.body.address,
        contact : request.body.contact,
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

  };
  