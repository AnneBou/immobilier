const mongoose = require('mongoose');
mongoose.connect(
    'mongodb+srv://Anne:NV42cuzjq3lRN044@cluster0.rrzkr.mongodb.net/immo', 
    {connectTimeoutMS : 3000, socketTimeoutMS: 20000, useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.once('open', () => {
   console.log(`connexion OK !`);
});
