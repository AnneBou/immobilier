const RepoUser = require('../repository/User');

module.exports = class Register {
    print(req, res) {
        res.render('register/form');  
    }

    process(request, response) {
        let entity = {
            email : request.body.email || '',
            password : request.body.password || '', // devra être hashé
                /* let bcrypt = require('bcryptjs'),
                entity.password = bcrypt.hashSync(
                entity.password, 
                bcrypt.genSaltSync(10)
            ), */
            civility : request.body.civility || '',
            firstname: request.body.firstname || '',
            lastname: request.body.lastname || '',
            phone: request.body.phone || ''
        }; 

        let repo = new RepoUser();
        // Promesse (méthode asynchrone)
        // Quand on a la réponse, alors ("then") redirection
        repo.emailExists(entity.email).then((result) => {
            // si l'email existe deja dans la bdd
            if(result === true) {
                response.render('register/form', { 
                    error : `Cette adresse email existe déjà`, 
                    form : entity 
                }); 
            } else {
                // sinon on tente de le créer
                repo.add(entity).then((user) => {
                    // resolve
                    response.redirect('/');
                    // reject
                }, (err) => {
                    // console.log(err);
                    response.render('register/form', { 
                        error : `L'enregistrement en base de données a échoué`, 
                        form : entity 
                    }); 
                });         
            }
        });
    }

};
