var mongoose = require("mongoose");

var progressSchema = new mongoose.Schema({
  user_key: {type: String},
  quest: {type: String},
  point: {type: String},
  question: {type: String},
  latitud: {type: String},
  longitud: {type: String},
  timestamp: {type: String}
},
  {versionKey: false}
);
module.exports = mongoose.model('Progress', progressSchema, 'progress');
