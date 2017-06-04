var mongoose = require('mongoose');
var adminModel = new (require('../models/admin'));
var locacionModel = new (require('../models/location'));
var questionModel = new (require('../models/question'));
var gameModel = new (require('../models/game'));
var progressModel = new (require('../models/progress'));
var admins = mongoose.model("Admin");
var questions = mongoose.model("Question");
var locations = mongoose.model("Location");
var games = mongoose.model("Game");
var progress = mongoose.model("Progress");


//Carga la pagina de login
exports.prueba = function(req, res){
  var user_key = req.query.user_key;
  var nPoints;
  console.log("Peticion recibida desde app");
  progress.find({"user_key": user_key}, function(err, user){
    if(err) throw err;
    console.log(user[0]);
    games.find({number: user[0].quest}, function(err, game){
      if(err) throw err;
      nPoints = game[0].nPoints;
      console.log("game   :" + game[0]);
      var point = parseInt(user[0].point) + 1;
      console.log("punto: " + point);
      questions.find({"numLocation.numLoc": point,
        "numLocation.numQuest": user[0].question}, function(err, question){
          if(err) throw err;
          console.log("question   :" + question[0]);
          res.json({
            question: question[0].question,
            answer1: question[0].answer1,
            answer2: question[0].answer2,
            answer3: question[0].answer3,
            answer4: question[0].answer4
          });
        });
    });
  });
};

exports.nextLocation = function(req, res){
  var user_key = req.query.user_key;
  progress.find({"user_key": user_key}, function(err, user){
    if(err) throw err;
    //console.log(user[0]);
    var point = parseInt(user[0].point) + 1;
    //console.log("point: " + point);
    locations.find({"numero": point}, function(err, location) {
      if(err) throw err;
      //console.log(location[0]);
      res.json({
        latitud: location[0].latitud,
        longitud: location[0].longitud,
        pista: location[0].pista,
        lugar: location[0].lugar
      });
    });
  });
}
