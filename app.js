var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require("method-override");
var path = require("path");
var app = express();

//////*******Conexión a base de datos*********//////
mongoose.connect('mongodb://localhost/servidor', function(err, res){
  if(err) throw err;
  console.log('Conectado a la base de datos');
});

//////*******Importando modelos y controladores*********//////
var models = require('./models/admin')(app, mongoose);
var AdminCtrl = require('./controllers/admin');




// Middlewares
//bodyParser Permite parsear JSON.
//methodOverride: Permite implementar y personalizar métodos HTTP.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

//Se hace la carpeta publica
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

var router = express.Router();

//////*******Rutas modelos y controladores*********//////
router.route('/admins')
 .get(AdminCtrl.findAll)
 .post(AdminCtrl.add);

router.route('/admins/:id')
 .get(AdminCtrl.findById)
 .put(AdminCtrl.update)
 .delete(AdminCtrl.delete);


 app.use('/router', router);


// Index
router.get('/', function(req, res) {
 res.sendfile("views/index.html");
});

app.use(router);

// Start server
app.listen(8000, function() {
 console.log("Node server running on http://localhost:8000");
});
