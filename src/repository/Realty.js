require('../../app/database.js');
const mongoose = require('mongoose');
// const UserSchema = require('./UserSchema.js');

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
 
module.exports = class Realty { // Accès à la collection Realty
    constructor() {
        this.db = mongoose.model('Realty', RealtySchema); 
    }

    find(search = {}) {
        return new Promise((resolve, reject) => {
            this.db.find(search, function (err, realty) {
                if (err) reject(err);
                resolve(realty);
            });
        });
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