var mongoose = require('mongoose');
var path = require('path');
var admin = new (require('../models/admin'));


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
  //var name = req.body.name;
  //console.log('Nombre: ', name);
  return;

};


//Comprobar administrador y dar acceso
exports.comprobar = function(req, res){
  console.log('Dentro del post de comprobar');
  console.log(req.body.name);

  //var name = JSON.stringify(req.body);
  //var pass = req.body.password;
  return;
};
