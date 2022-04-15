require('../../app/database.js');
const mongoose = require('mongoose');

const RealtySchema = mongoose.Schema({
    address : {
        address1 : { type: String },
        address2 : { type: String },
        city : {type: String },
        zipcode: { type: String },
        info: { type: String },
    },
    contact : {
        firstname : { type: String },
        lastname : { type: String },
        email : { type: String },
        phone : { type: Number },
        mobile : { type: Number },
        info : { type: String },
    },
    date: { type: Date, default: Date.now }
},{versionKey: false});
 
module.exports = class Realty { // Accès à la collection Realty
    constructor() {
        this.db = mongoose.model('Realty', RealtySchema); 
    }

    add(realtyEntity) {
        return new Promise((resolve, reject) => {
            this.db.create(realtyEntity, function (err, realty) {
                if (err) reject(err);
                resolve(realty);
            });
        });
    }
}