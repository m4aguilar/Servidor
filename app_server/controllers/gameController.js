var mongoose = require('mongoose');
var adminModel = new (require('../models/admin'));
var locacionModel = new (require('../models/location'));
var questionModel = new (require('../models/question'));
var gameModel = new (require('../models/game'));
var admins = mongoose.model("Admin");
var questions = mongoose.model("Question");
var locations = mongoose.model("Location");
var games = mongoose.model("Game");


exports.game = function(req, res){
  var num = req.query.num;
  if(req.session.name){
    games.find({number: num}, function(err, game){
      var nPoints = game[0].nPoints+1;
      locations.find({numero: { $lt: nPoints }}, function(err, locations){
        res.render('game.html', {
          locations : JSON.stringify(locations),
          name: req.session.name,
          number: num,
          nPoints: game[0].nPoints
        })
      });
    });
  }else{
    res.redirect("/admin");
    res.sendFile("/Migit/Servidor/app_server/views/login.html");
  }
}

exports.seeGames = function(req, res){
  if(req.session.name){
    games.find({}, function(err, games){
      if(err) throw err;
      res.render('games.html', {
        games: games,
        name: req.session.name
      });
    });
  }else{
    res.redirect("/admin");
    res.sendFile("/Migit/Servidor/app_server/views/login.html");
  }
}

exports.createGame = function(req, res){
  var i = 0;
  var num = 1;
  if(req.session.name){
    games.find({}, function(err, games){
      if(err){
        throw err;
      }else{
        while(games[i] != null){
          if(games[i].number >= num){
            num++;
          }
          i++;
        }
        i=0;
      }
      res.render("createGame.html", {num: num});
    });
  }else{
    res.redirect("/admin");
    res.sendFile("/Migit/Servidor/app_server/views/login.html");
  }
};

exports.saveGame = function(req, res){
  if(req.session.name){
    games.create({
      number: req.body.number,
      nPoints: req.body.nPoints
    }, function(err, doc){
      if(err){
        throw err;
      }else{
        games.find({}, function(err, games){
          if(err){
            throw err;
          }else{
            res.render('games.html', {
              games,
              name: req.session.name
            })
          }
        });
      }
    });
  }else{
    res.redirect("/admin");
    res.sendFile("/Migit/Servidor/app_server/views/login.html");
  }
};

exports.deleteGame = function(req, res){
  var numGame = req.query.num;

  if(req.session.name){
    games.remove({"number": numGame},
    function(err, resultado){
      games.find({}, function(err, games){
        if(err){
          throw err;
        }else{
          res.render('games.html', {
            games: games,
            name: req.session.name
          });
        }
      });
    });
  }else{
    res.redirect("/admin");
    res.sendFile("/Migit/Servidor/app_server/views/login.html");
  }
};
