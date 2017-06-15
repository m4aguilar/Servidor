var mongoose = require('mongoose');
var crypto = require('crypto');
var dateFormat = require('dateFormat');
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
exports.sendQuestion = function(req, res){
  var user_key = req.query.user_key;
  var nPoints;
  console.log("Peticion recibida desde app");
  progress.find({"user_key": user_key}, function(err, user){
    if(err) throw err;
    //console.log(user[0]);
    games.find({number: user[0].quest}, function(err, game){
      if(err) throw err;
      nPoints = game[0].nPoints;
      //console.log("game   :" + game[0]);
      var point = parseInt(user[0].point);
      //console.log("punto: " + point);
      questions.find({"numLocation.numLoc": point,
        "numLocation.numQuest": user[0].question}, function(err, question){
          if(err) throw err;
          //console.log("question   :" + question[0]);
          res.json({
            question: question[0].question,
            answer1: question[0].answer1,
            answer2: question[0].answer2,
            answer3: question[0].answer3,
            correctAnswer: question[0].correctAnswer
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
    var point = parseInt(user[0].point);
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

exports.checkHash = function(req, res){

  var now = new Date();
  var datetime = dateFormat(now, "yyyy:mm:dd:HH:MM");
  console.log("Fecha: " + datetime);
  // const secret = '1234';
  // const hash = crypto.createHmac('sha256', secret)
  //                  .update(datetime)
  //                  .digest('hex');

  var user_key = req.query.user_key;
  progress.find({"user_key": user_key}, function(err, user){
    if(err) throw err;
    //console.log("User: " + user[0]);
    var point = parseInt(user[0].point);
    //console.log("point: " + point);
    locations.find({"numero": point}, function(err, location) {
      if(err) throw err;
      var key = location[0].key;
      console.log("key: " + key);
      const hash = crypto.createHmac('sha256', key)
                       .update(datetime)
                       .digest('hex');
      console.log("hash: " + hash);
      res.json({
        hash: hash,
      });

    });
  });
}
exports.appProgress = function(req, res){
  var user_key = req.query.user_key;

  progress.find({"user_key": user_key}, function(err, user){
    if(err) throw err;
    var point = parseInt(user[0].point) + 1;
    locations.find({numero: point}, function(err, location){
      var latitud = location[0].latitud;
      var longitud = location[0].longitud;
      progress.update({"user_key": user_key},
        {$set:{
          point: point,
          latitud: latitud,
          longitud: longitud
        }
      }, function(err, resultado){
        if(err) throw err;
        res.json({
          progress: "Progreso actualizada",
        });

      });

    });

  });
}

exports.appMarkers = function(req, res){
  var user_key = req.query.user_key;
  progress.find({"user_key": user_key}, function(err, user){
    if(err) throw err;
    var point = parseInt(user[0].point);
    locations.find({numero : {$lt: point}},{
      _id: 0, numero:1, latitud: 1, longitud: 1}, function(err, locations){
      if(err) throw err;
      res.json({
         locations: locations
      });
    });
  });
}


exports.appTrail = function(req, res){
  var user_key = req.query.user_key;
  progress.find({"user_key": user_key}, function(err, user){
    if(err) throw err;
    var point = parseInt(user[0].point);
    locations.find({numero : point},{
      _id: 0, pista:1}, function(err, trail){
      if(err) throw err;
      console.log("Trail: " + trail);
      res.json({
         trail: trail[0].pista
      });
    });
  });
}
