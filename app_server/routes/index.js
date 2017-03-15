var express = require('express');
var router = express.Router();
var adminController = require('../controllers/adminController');
var app = express();
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Routes index");
  res.render('index.html');
});



//Rutas de usuario
router.get('/admin', adminController.login);
router.post('/admin', adminController.comprobar);

module.exports = router;
