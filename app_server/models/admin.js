var mongoose = require("mongoose");


var adminSchema = new mongoose.Schema({
  _id: {type: String},
  email: {type: String},
  password: {type: String}
},
  {versionKey: false}
);


//1º parámetro: el nombre del modelo
//2º parámetro: el nombre del esquema usado(schema)
//3º parámetro: (opcional) el nombre de la coleccion en mongoDB usada
module.exports = mongoose.model('Admin', adminSchema);
//module.exports = mongoose.model('Admin', adminSchema, 'admins');
