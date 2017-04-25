var mongoose = require('mongoose');
var adminModel = new (require('../models/admin'));
var locacionModel = new (require('../models/location'));
var questionModel = new (require('../models/question'));
var admins = mongoose.model("Admin");
var questions = mongoose.model("Question");
var locations = mongoose.model("Location");

//Carga la pagina de login
exports.login = function(req, res){

  console.log('Dentro del get login del controlador');

  res.render('login.html');

};

//Comprobar administrador y dar acceso
exports.comprobar = function(req, res){
  console.log('Dentro del post de comprobar');
  var name = req.body.name;
  var password = req.body.password;


  admins.find({name:name, password:password}, function(err, administradores){
    if(err) throw err;
    if(administradores == false){
      console.log("Login incorrecto");
    }else{
      console.log("Login correcto");
      res.render("dashboard.html");
    }
  });
};



exports.estadisticas = function(req, res){
  res.render('statistics.html');
};
