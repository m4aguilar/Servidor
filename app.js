var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// importar method-override para poder usar métodos PUT y DELETE
var methodOverride = require("method-override");
var path = require("path");

var app = express();

var adminController = require('./app_server/controllers/adminController');
//Controlador de rutas admin
var admin = require('./app_server/routes/admin');
//Controlador de rutas index
var routes = require('./app_server/routes/index');



//////*******Conexión a base de datos*********//////
// mongoose.connect('mongodb://localhost/servidor', function(err, res){
//   if(err) throw err;
//   console.log('Conectado a la base de datos');
// });

//Se hace la carpeta publica
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'app_server', 'views'));

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')

app.use('/', routes);
app.use('/admin', admin);

//Middlewares
//bodyParser Permite parsear JSON.
//methodOverride: Permite implementar y personalizar métodos HTTP.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

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

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });


module.exports = app;
