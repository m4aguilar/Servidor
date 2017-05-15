var mongoose = require('mongoose');
var adminModel = new (require('../models/admin'));
var locacionModel = new (require('../models/location'));
var questionModel = new (require('../models/question'));
var admins = mongoose.model("Admin");
var questions = mongoose.model("Question");
var locations = mongoose.model("Location");


exports.seeGames = function(req, res){
  if(req.session.name){
    // locations.find({"_id.$":0}, function(err, locations){
    //   if(err){
    //     throw err;
    //   }else{
    //     res.render('games.html',{
    //       locations: locations,
    //       name: req.session.name
    //     });
    //   }
    // });
    var query = locations.find(null,{_id:0, latitud:1, longitud:1, pista:1} ,
      function(err, locations){

        res.render('games.html',{
          locations: JSON.stringify(locations),
          name: req.session.name
        });
    });

  }else{
    res.redirect("/admin");
    res.sendFile("/Migit/Servidor/app_server/views/login.html");
  }
}
