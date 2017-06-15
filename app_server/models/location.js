var mongoose = require("mongoose");

var locationSchema = new mongoose.Schema({
  numero: {type: String},
  key: {type: String},
  lugar: {type: String},
  latitud: {type: String},
  longitud: {type: String},
  pista: {type: String}
},
  {versionKey: false}
);


//1º parámetro: el nombre del modelo
//2º parámetro: el nombre del esquema usado(schema)
//3º parámetro: (opcional) el nombre de la coleccion en mongoDB usada
//module.exports = mongoose.model('Admin', adminSchema, 'admins');

module.exports = mongoose.model('Location', locationSchema, 'locations');
