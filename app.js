var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();

var app = express();

//app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

//Para renderizar los fichero hatml de la carpeta views
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//Para decirle a express que se va a usar body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var routes = require('./routes/index');

//Redirecciona las direcciones '/'
app.use('/', routes);


//Escucha por el puerto 8000
app.listen(8000);
