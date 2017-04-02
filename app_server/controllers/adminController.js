var mongoose = require('mongoose');
var adminModel = new (require('../models/admin'));
var locacionModel = new (require('../models/location'));
var admins = mongoose.model("Admin");
var locations = mongoose.model("Location");



/*
//GET - Return all registers
exports.findAll = function(req, res) {
 Admin.find(function(err, admins) {
 if(err) res.send(500, err.message);
 console.log('GET /admins')
 res.status(200).jsonp(admins);
 });
};

//GET - Return a register with specified ID
exports.findById = function(req, res) {
  Admin.findById(req.params.id, function(err, client) {
  if(err) return res.send(500, err.message);
  console.log('GET /admins/' + req.params.id);
  res.status(200).jsonp(admin);
  });
};

//POST - Insert a new register
exports.add = function(req, res) {
  console.log('POST');
  console.log(req.body);
  var admin = new Admin({
  name: req.body.name,
  password: req.body.password
  });
  admin.save(function(err, admin) {
  if(err) return res.send(500, err.message);
  res.status(200).jsonp(admin);
  });
};

//PUT - Update a register already exists
exports.update = function(req, res) {
  Admin.findById(req.params.id, function(err, admin) {
  admin.name = req.body.name;
  admin.password = req.body.password;
  admin.save(function(err) {
  if(err) return res.send(500, err.message);
  res.status(200).jsonp(admin);
  });
  });
};


//DELETE - Delete a register with specified ID
exports.delete = function(req, res) {
  Admin.findById(req.params.id, function(err, admin) {
  admin.remove(function(err) {
  if(err) return res.send(500, err.message);
  res.json({ message: 'Borrado correctamente' });
  });
  });
};
*/

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



exports.estadisticas = function(req, res){
  res.render('statistics.html');
};
