var mongoose = require("mongoose");

var questionSchema = new mongoose.Schema({
  _id: {type: String},
  numberlocation:{type: Number},
  question: {type: String},
  answer1: {type: String},
  answer2: {type: String},
  answer3: {type: String},
  answer4: {type: String},
  correctAnswer: {type: String}
});


//1º parámetro: el nombre del modelo
//2º parámetro: el nombre del esquema usado(schema)
//3º parámetro: (opcional) el nombre de la coleccion en mongoDB usada
//module.exports = mongoose.model('Admin', adminSchema, 'admins');

module.exports = mongoose.model('Question', questionSchema, 'questions');
