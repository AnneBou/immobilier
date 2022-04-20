require('../../app/database.js');
const mongoose = require('mongoose');

const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const RealtySchema = mongoose.Schema({
    address : {
        address1 : { type: String },
        address2 : { type: String },
        city : {type: String },
        zipcode : { type: String },
        info : { type: String },
    },
    contact : {
        firstname : { type: String },
        lastname : { type: String },
        email : { type: String },
        phone : { type: Number },
        mobile : { type: Number },
        info : { type: String },
    },
    realty : {
        type : { type: String },
        area : { type: Number },
        room : { type: Number },
        price : { type: Number },
        info : { type: String },
    },
    // agent : { type: UserSchema },
    agent : {
        email : { type: String },
        firstname : { type: String },
        lastname : { type: String },
        phone : { type: Number }
    },
    date : { type: Date, default: Date.now },
    slug: { type: String, slug: ['address.city','agent.lastname'], unique:true },
},{versionKey: false});
 
// Accès à la collection Realty
module.exports = class Realty {
    constructor() {
        this.db = mongoose.model('Realty', RealtySchema); 
    }

    // Ajouter un bien
    add(realtyEntity) {
        return new Promise((resolve, reject) => {
            this.db.create(realtyEntity, function (err, realty) {
                if (err) reject(err);
                resolve(realty);
            });
        });
    }

    // Liste des biens
    find(search = {}) {
        return new Promise((resolve, reject) => {
            this.db.find(search, function (err, realty) {
                if (err) reject(err);
                resolve(realty);
            });
        });
    }

    // Pour la suppression et la modification
    findById(id) {
        return new Promise((resolve, reject) => {
            this.db.findById(id, function (err, realty) {
                if (err || realty === null) reject();
                resolve(realty);
            });
        });
    }

    // Modifier un bien
    edit(realtyEntity, id) {
        return new Promise((resolve, reject) => {
            this.db.findOneAndUpdate({_id:id},realtyEntity, function (err, realty) {
                if (err) reject(err);
                resolve(realty);
            });
        });
    }

    // Supprimer un bien
    delete(filter = {}) {
        return new Promise((resolve, reject) => {
            this.db.deleteOne(filter, function (err) {
                if (err) reject(err);
                resolve();
            });
        });
    }

}