var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var adminSchema = new Schema({
  name: {type: String},
  password: {type: String}
});

module.exports = mongoose.model('Admin', adminSchema);
