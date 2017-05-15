var mongoose = require('mongoose');
var adminModel = new (require('../models/admin'));
var locacionModel = new (require('../models/location'));
var questionModel = new (require('../models/question'));
var admins = mongoose.model("Admin");
var questions = mongoose.model("Question");
var locations = mongoose.model("Location");

//Carga la pagina de login
exports.login = function(req, res){
  res.render('login.html');
};

//Comprobar administrador y dar acceso
exports.comprobar = function(req, res){

  var name = req.body.name;
  var password = req.body.password;
  console.log("name: " + name);
  console.log("password: " + password);

  admins.find({name:name, password:password}, function(err, administradores){
    if(err) throw err;
    if(administradores == false){
      console.log("Login incorrecto");
    }else{
      console.log("Login correcto");
      req.session.name = name;
      console.log("Datos de sesion: ");
      console.log("ID: " + req.sessionID);
      if(req.session.name){
        console.log("Bienvenido " + req.session.name);
      }else{
        console.log("Bienvenido usuario desconocido");
      }
      res.render("dashboard.html", {
        name: req.session.name
      });
    }
  });
};

exports.estadisticas = function(req, res){
  if(req.session.name){
    res.render('statistics.html',{
      name: req.session.name
    });
  }else{
    res.redirect("/admin");
    res.sendFile("/Migit/Servidor/app_server/views/login.html");
  }

};

exports.logout = function(req, res){
  if(req.session.name){
    req.session.destroy();
    console.log("Sesión cerrada");
    // res.render("login.html");
    res.redirect("/admin");
    res.sendFile("/Migit/Servidor/app_server/views/login.html");
  }else{
    res.redirect("/admin");
    res.sendFile("/Migit/Servidor/app_server/views/login.html");
  }
}
