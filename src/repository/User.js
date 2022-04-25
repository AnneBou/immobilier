require('../../app/database.js');
const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    email : {  type: String },
    password : { type: String },
    civility : {type: String, match: /^[1-2]{1}$/},
    firstname: { type: String/*, match: /^[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž-]+$/i*/ },
    lastname: { type: String/*, match: /^[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž-]+$/i*/ },
    phone: { type: String/*, match: /^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/*/ },
    roles: { type: Array },
    date: { type: Date, default: Date.now }
}, { versionKey: false });
 
module.exports = class User { // Accès à la collection User
    constructor() {
        this.db = mongoose.model('User', UserSchema); 
    }
    
    // Liste des utilisateurs
    find(search = {}) {
        return new Promise((resolve, reject) => {
            this.db.find(search, function (err, user) {
                if (err) reject(err);
                resolve(user);
            });
        });
    }
    
    // Pour la suppression et la modification
    findById(id) {
        return new Promise((resolve, reject) => {
            this.db.findById(id, function (err, user) {
                if (err || user === null) reject();
                resolve(user);
            });
        });
    }
    
    // Ajouter un utilisateur
    add(userEntity) {
        return new Promise((resolve, reject) => {
            this.db.create(userEntity, function (err, user) {
                if (err) reject(err);
                resolve(user);
            });
        });
    }

    // Modifier un utilisateur
    edit(userEntity, id) {
        return new Promise((resolve, reject) => {
            this.db.findOneAndUpdate({_id:id},userEntity, function (err, user) {
                if (err) reject(err);
                resolve(user);
            });
        });
    }

    // Supprimer un utilisateur
    delete(filter = {}) {
        return new Promise((resolve, reject) => {
            this.db.deleteOne(filter, function (err) {
                if (err) reject(err);
                resolve();
            });
        });
    }

    async emailExists(email) {
        return await this.db.findOne({email}) ? true : false;
    }

    getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ email }, (err, user) => {
                // si pas d'erreur, email trouvé
                if (!err && user !== null) {
                   resolve(user);
                }  
                reject(false);
            })
        })
    }    

}