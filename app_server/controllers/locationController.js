var mongoose = require('mongoose');
var adminModel = new (require('../models/admin'));
var locacionModel = new (require('../models/location'));
var questionModel = new (require('../models/question'));
var admins = mongoose.model("Admin");
var questions = mongoose.model("Question");
var locations = mongoose.model("Location");

exports.ubicaciones = function(req, res){

  if(req.session.state){
    res.json({state: req.session.state});
  }

  if(req.session.name){
    locations.find({}, function(err, ubicaciones){
      if(err) throw err;
      //console.log(ubicaciones);
      res.render('location.html', {
        ubicaciones:ubicaciones,
        name: req.session.name
      });
    });
    //Si la sesión no esta iniciada, vuelve al login
  }else{
    res.redirect("/admin");
    res.sendFile("/Migit/Servidor/app_server/views/login.html");
  }

};

exports.editLocation = function(req, res){
  var num = req.query.num;
  if(req.session.name){
    locations.find({numero: num}, function(err, location){
      if(err){
        throw err;
      }else{
        res.render('editLocation.html', {location: location});
      }
    });
  }else{
    res.redirect("/admin");
    res.sendFile("/Migit/Servidor/app_server/views/login.html");
  }

};

exports.saveEditLocation = function(req, res){
  var long = req.body.longitud;
  var lat = req.body.latitud;
  var pist = req.body.pista;
  var num = req.body.numero;

  if(req.session.name){
    locations.update({numero:num},
      {$set:{longitud: long, latitud:lat, pista:pist}
    }, function(err, resultado){
      if(err){
        throw err;
      }else{
        locations.find({}, function(err, ubicaciones){
          if(err){
            throw err;
          }else{
            res.render('location.html', {
              name: req.session.name,
              ubicaciones: ubicaciones
            });
          }
        });
      }
    });
  }else{
    res.redirect("/admin");
    res.sendFile("/Migit/Servidor/app_server/views/login.html");
  }
};

exports.createLocation = function(req, res){
  var i = 0;
  var num = 1;
  if(req.session.name){
    locations.find({}, function(err, location){
      if(err){
        throw err;
      }else{
        while(location[i] != null){
          if(location[i].numero >= num){
            num++;
          }
          i++;
        }
        i=0;
      }
      res.render("createLocation.html", {num: num});
    });
  }else{
    res.redirect("/admin");
    res.sendFile("/Migit/Servidor/app_server/views/login.html");
  }
};

exports.saveLocation = function(req, res){

  if(req.session.name){
    locations.create({
      numero: req.body.numero,
      longitud: req.body.longitud,
      latitud: req.body.latitud,
      pista: req.body.pista,
      lugar: req.body.lugar
    }, function(err, doc){
      if(err){
        throw err;
      }else{
        locations.find({}, function(err, ubicaciones){
          if(err){
            throw err;
          }else{
            res.render('location.html', {
              ubicaciones,
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


exports.deleteLocation = function(req, res){
  var numLoc = req.query.num;

  if(req.session.name){
    locations.remove({numero: numLoc}, function(err, location){
      if(err){
        throw err;
      }else{
        //Elimina las preguntas de la ubicación eliminada
        questions.remove({"numLocation.numLoc": numLoc}, function(err, question){
          if(err) throw err;
        });
        locations.find({}, function(err, ubicaciones){
          if(err){
            throw err;
          }else{
            res.render('location.html', {
              ubicaciones,
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
