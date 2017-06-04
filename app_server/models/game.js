var mongoose = require("mongoose");

var gameSchema = new mongoose.Schema({
  number: {type: String},
  nPoints: {type: String}
},
  {versionKey: false}
);
module.exports = mongoose.model('Game', gameSchema);
