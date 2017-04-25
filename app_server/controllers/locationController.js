var mongoose = require('mongoose');
var adminModel = new (require('../models/admin'));
var locacionModel = new (require('../models/location'));
var questionModel = new (require('../models/question'));
var admins = mongoose.model("Admin");
var questions = mongoose.model("Question");
var locations = mongoose.model("Location");

exports.ubicaciones = function(req, res){
  locations.find({}, function(err, ubicaciones){
    if(err) throw err;
    //console.log(ubicaciones);
    res.render('location.html', {ubicaciones:ubicaciones});
  });

};

exports.editLocation = function(req, res){
  var num = req.query.num;
  locations.find({numero: num}, function(err, location){
    if(err){
      throw err;
    }else{
      res.render('editLocation.html', {location: location});
    }
  });
};

exports.saveEditLocation = function(req, res){
  var long = req.body.longitud;
  var lat = req.body.latitud;
  var pist = req.body.pista;
  var num = req.body.numero;

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
          res.render('location.html', {ubicaciones:ubicaciones});
        }
      });
    }
  });
};

exports.createLocation = function(req, res){
  var i = 0;
  var num = 1;

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
};

exports.saveLocation = function(req, res){
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
          res.render('location.html', {ubicaciones})
        }
      });
    }
  });
};


exports.deleteLocation = function(req, res){
  var numLoc = req.query.num;

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
          res.render('location.html', {ubicaciones})
        }
      });
    }
  });
};
