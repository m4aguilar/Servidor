var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require("path");
var ejs = require("ejs");
var cookieParser = require("cookie-parser");
var session = require("express-session");

var app = express();

//Sesiones
app.use(cookieParser());
app.use(session({
  secret : "keyboard cat",
  resave: false,
  saveUninitialized: true
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use(express.static(path.join(__dirname, 'app_server/js')));
app.set('views', path.join(__dirname, 'app_server', 'views'));

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')

var adminController = require('./app_server/controllers/adminController');
//Controlador de rutas admin
var admin = require('./app_server/routes/admin');
//Controlador de rutas index
var routes = require('./app_server/routes/index');



//////*******Conexión a base de datos*********//////
mongoose.connect('mongodb://localhost/servidor', function(err, db){
  if(err) throw err;
  console.log('Conectado a la base de datos');
});

//Se hace la carpeta publica

app.use('/', routes);
//app.use('/admin', admin);

//Middlewares
//bodyParser Permite parsear JSON.
//methodOverride: Permite implementar y personalizar métodos HTTP.

// app.get('/', function (req, res, next) {
//   res.render('index.html');
// });

// app.post('/admin/comprobar', function (req, res, next) {
//   var name = req.body.name;
//   console.log("Nombre: ", name);
// });

// Start server
app.listen(8000, function(req, res) {
 console.log("Node server running on http://localhost:8000");
});



module.exports = app;
