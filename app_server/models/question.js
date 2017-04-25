var mongoose = require("mongoose");

var questionSchema = new mongoose.Schema({
    question: {type: String},
    answer1: {type: String},
    answer2: {type: String},
    answer3: {type: String},
    answer4: {type: String},
    correctAnswer: {type: String},
    place: {type: String},
    numLocation: {
      numLoc: {type: String},
      numQuest: {type: String}
    }
  },
  {versionKey: false}
);

module.exports = mongoose.model('Question', questionSchema, 'questions');
